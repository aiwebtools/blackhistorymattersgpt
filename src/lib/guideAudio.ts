// Shared audio for the Time Machine: one AudioContext (unlocked on a tap),
// synthesized sound effects, and an ordered voice queue for the guide's speech.

let ctx: AudioContext | null = null;

export function getAudioCtx(): AudioContext {
  if (!ctx) {
    const C = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = new C();
  }
  return ctx;
}

/** Call synchronously inside a user tap/click so mobile browsers allow later playback. */
export function unlockAudio() {
  try {
    const c = getAudioCtx();
    if (c.state === "suspended") void c.resume();
    const b = c.createBuffer(1, 1, 22050);
    const s = c.createBufferSource();
    s.buffer = b;
    s.connect(c.destination);
    s.start(0);
  } catch { /* audio unavailable */ }
}

// ---------- Sound effects ----------
let sfxEnabled = typeof localStorage !== "undefined" ? localStorage.getItem("tm-sfx") !== "off" : true;
export const sfxIsOn = () => sfxEnabled;
export function setSfx(on: boolean) {
  sfxEnabled = on;
  localStorage.setItem("tm-sfx", on ? "on" : "off");
}

function tone(freq: number, start: number, dur: number, type: OscillatorType, peak: number, freqEnd?: number) {
  const c = getAudioCtx();
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, c.currentTime + start);
  if (freqEnd) o.frequency.exponentialRampToValueAtTime(freqEnd, c.currentTime + start + dur);
  g.gain.setValueAtTime(0.0001, c.currentTime + start);
  g.gain.exponentialRampToValueAtTime(peak, c.currentTime + start + Math.min(0.04, dur / 4));
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + start + dur);
  o.connect(g).connect(c.destination);
  o.start(c.currentTime + start);
  o.stop(c.currentTime + start + dur + 0.05);
}

function whoosh(start: number, dur: number, from: number, to: number, peak: number) {
  const c = getAudioCtx();
  const len = Math.floor(c.sampleRate * dur);
  const buf = c.createBuffer(1, len, c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  const src = c.createBufferSource();
  src.buffer = buf;
  const f = c.createBiquadFilter();
  f.type = "bandpass";
  f.Q.value = 1.2;
  f.frequency.setValueAtTime(from, c.currentTime + start);
  f.frequency.exponentialRampToValueAtTime(to, c.currentTime + start + dur);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, c.currentTime + start);
  g.gain.exponentialRampToValueAtTime(peak, c.currentTime + start + dur * 0.6);
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + start + dur);
  src.connect(f).connect(g).connect(c.destination);
  src.start(c.currentTime + start);
}

function play(fn: () => void) {
  if (!sfxEnabled) return;
  try { fn(); } catch { /* ignore */ }
}

export const sfx = {
  send: () => play(() => { tone(520, 0, 0.12, "sine", 0.12, 780); tone(1040, 0.06, 0.15, "sine", 0.05); }),
  ritualStart: () => play(() => {
    tone(55, 0, 6, "sawtooth", 0.035, 110);
    tone(82.4, 0, 6, "sine", 0.06, 164.8);
    whoosh(0, 3, 200, 3000, 0.08);
    whoosh(3, 3, 3000, 400, 0.06);
  }),
  ritualTick: () => play(() => { tone(880, 0, 0.9, "sine", 0.06); tone(1320, 0.02, 0.7, "sine", 0.03); }),
  arrival: () => play(() => {
    [261.6, 329.6, 392, 523.3].forEach((f, i) => tone(f, i * 0.09, 2.2, "triangle", 0.06));
    whoosh(0, 1.2, 4000, 300, 0.05);
  }),
  imagesReady: () => play(() => { tone(1568, 0, 0.5, "sine", 0.05); tone(2093, 0.12, 0.6, "sine", 0.04); }),
  micOn: () => play(() => tone(660, 0, 0.12, "sine", 0.1, 990)),
  micOff: () => play(() => tone(990, 0, 0.12, "sine", 0.08, 660)),
};

// ---------- Speech text helpers ----------
const SOURCES_RE = /📖\s*Sources to explore:[\s\S]*?(?=Shall I make|$)/;

/** Text the guide should speak: drops the sources list, markdown and emoji. */
export function speakableBody(text: string) {
  return text.replace(SOURCES_RE, "\n");
}

export function cleanForSpeech(text: string) {
  return text
    .replace(/https?:\/\/\S+/g, "")
    .replace(/\p{Extended_Pictographic}|\uFE0F|\u200D/gu, "")
    .replace(/[#*_>`~|]/g, "")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{2,}/g, "\n")
    .trim();
}

/** Split long text into speakable chunks at paragraph or sentence boundaries. */
export function splitForSpeech(text: string, first = 220, max = 1400) {
  const out: string[] = [];
  let rest = speakableBody(text);
  let min = first;
  while (rest.trim()) {
    if (rest.length <= max) { out.push(rest); break; }
    let cut = rest.indexOf("\n", min);
    if (cut < 0 || cut > max) {
      const s = rest.slice(min).search(/[.!?…]["”’)]?\s/);
      cut = s >= 0 && min + s + 1 <= max ? min + s + 1 : max;
    }
    out.push(rest.slice(0, cut));
    rest = rest.slice(cut);
    min = out.length === 1 ? 500 : 900;
  }
  return out.filter((c) => cleanForSpeech(c));
}

// ---------- Voice queue ----------
type Fetcher = (text: string) => Promise<ArrayBuffer>;

export class VoiceQueue {
  private items: Promise<AudioBuffer | null>[] = [];
  private fetches: Promise<unknown>[] = [];
  private playing = false;
  private open = false;
  private gen = 0;
  private tag = "";
  private source?: AudioBufferSourceNode;
  onState?: (speaking: boolean, tag: string) => void;
  onError?: (message: string) => void;
  onIdle?: (tag: string) => void;

  constructor(private fetcher: Fetcher) {}

  /** Start a new speech session (stops anything currently speaking). */
  begin(tag: string) {
    this.stop();
    this.tag = tag;
    this.open = true;
    this.onState?.(true, tag);
  }

  enqueue(text: string) {
    const t = cleanForSpeech(text);
    if (!t) return;
    const g = this.gen;
    // At most two voice requests in flight: the next part is ready before the current one ends.
    const gate = this.fetches.length >= 2 ? this.fetches[this.fetches.length - 2] : Promise.resolve();
    const p = gate
      .catch(() => undefined)
      .then(() => (g === this.gen ? this.fetcher(t) : null))
      .then(async (ab) => (ab && g === this.gen ? await getAudioCtx().decodeAudioData(ab) : null));
    this.fetches.push(p);
    this.items.push(p);
    void this.pump(g);
  }

  /** No more text is coming for this session. */
  finish() {
    this.open = false;
    if (!this.playing && this.items.length === 0) this.done(this.gen);
  }

  stop() {
    this.gen++;
    this.items = [];
    this.fetches = [];
    this.open = false;
    try { this.source?.stop(); } catch { /* already stopped */ }
    this.source = undefined;
    if (this.playing || this.tag) {
      this.playing = false;
      const t = this.tag;
      this.tag = "";
      this.onState?.(false, t);
    }
  }

  private done(g: number) {
    if (g !== this.gen) return;
    const t = this.tag;
    this.tag = "";
    this.onState?.(false, t);
    this.onIdle?.(t);
  }

  private async pump(g: number) {
    if (this.playing) return;
    this.playing = true;
    while (this.items.length && g === this.gen) {
      const next = this.items.shift()!;
      let buf: AudioBuffer | null = null;
      try {
        buf = await next;
      } catch (e) {
        if (g === this.gen) { this.onError?.((e as Error).message); this.stop(); }
        return;
      }
      if (buf && g === this.gen) await this.playBuffer(buf);
    }
    if (g !== this.gen) return;
    this.playing = false;
    if (!this.open) this.done(g);
  }

  private playBuffer(buf: AudioBuffer) {
    return new Promise<void>((resolve) => {
      const c = getAudioCtx();
      if (c.state === "suspended") void c.resume();
      const s = c.createBufferSource();
      s.buffer = buf;
      s.connect(c.destination);
      s.onended = () => resolve();
      this.source = s;
      s.start();
    });
  }
}
