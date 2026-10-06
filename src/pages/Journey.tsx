import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { toast } from "sonner";
import { Menu, Plus, Trash2, Pencil, Send, Square, Volume2, VolumeX, Pause, Download, ImageIcon, Home, LogOut, Loader2, Mic, MicOff, Bell, BellOff } from "lucide-react";
import { VoiceQueue, sfx, sfxIsOn, setSfx, speakableBody, splitForSpeech, unlockAudio } from "@/lib/guideAudio";

const OPENING =
  "Dear traveler of justice, what date in the long journey of our people do you wish to teleport to, and which Black land, ancient tribe, hidden legacy, or moment in our global struggle for freedom would you like to walk upon?";
const RITUAL = [
  "Initiating sacred time transition…",
  "Steady your heart, traveler—it's time to leave behind deception…",
  "Dismantling illusion systems…",
  "Righteous Archive Frequency (RAF) received…",
  "Time jump approved by the ancestors of liberation…",
  "SEQUENCE APPROVED.",
];
const FN = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1`;
const GUIDE_IMG = "/lovable-uploads/4e17cfa0-fbe7-4cda-abc2-9d4deab16961.png";

type JourneyRow = { id: string; title: string; destination_date: string | null; destination_place: string | null; status: string; updated_at: string };
type Msg = { id: string; role: "user" | "assistant"; content: string };
type Img = { id: string; message_id: string; url: string; alt_text: string };

async function authHeaders() {
  const { data } = await supabase.auth.getSession();
  return {
    Authorization: `Bearer ${data.session?.access_token}`,
    apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
    "Content-Type": "application/json",
  };
}
async function readError(res: Response) {
  try { const j = await res.json(); return j.error ?? `Error ${res.status}`; } catch { return `Error ${res.status}`; }
}
async function fetchSpeech(text: string) {
  const r = await fetch(`${FN}/journey-voice`, { method: "POST", headers: await authHeaders(), body: JSON.stringify({ text }) });
  if (!r.ok) throw new Error(await readError(r));
  return r.arrayBuffer();
}

export default function Journey() {
  const { journeyId } = useParams();
  const nav = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [journeys, setJourneys] = useState<JourneyRow[]>([]);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [images, setImages] = useState<Img[]>([]);
  const [imgLoading, setImgLoading] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [date, setDate] = useState("");
  const [place, setPlace] = useState("");
  const [streaming, setStreaming] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [ritual, setRitual] = useState(-1);
  const [viewer, setViewer] = useState<Img | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [voiceOn, setVoiceOn] = useState(() => localStorage.getItem("tm-voice") !== "off");
  const [sfxOn, setSfxOn] = useState(sfxIsOn);
  const [listening, setListening] = useState(false);
  const [handsFree, setHandsFree] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const voiceOnRef = useRef(voiceOn);
  const handsFreeRef = useRef(false);
  const recRef = useRef<any>(null);
  const sendRef = useRef<(t: string) => void>(() => {});
  const startListeningRef = useRef<() => void>(() => {});
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  voiceOnRef.current = voiceOn;
  handsFreeRef.current = handsFree;

  // One voice queue for the guide (auto-speak while streaming + Listen buttons)
  const voiceRef = useRef<VoiceQueue | null>(null);
  if (!voiceRef.current) voiceRef.current = new VoiceQueue(fetchSpeech);
  useEffect(() => {
    const v = voiceRef.current!;
    v.onState = (on, tag) => setSpeakingId(on ? tag : null);
    v.onError = (msg) => toast.error(`Voice: ${msg}`);
    v.onIdle = (tag) => {
      if (tag === "live" && handsFreeRef.current) setTimeout(() => startListeningRef.current(), 350);
    };
    return () => { v.stop(); recRef.current?.abort?.(); };
  }, []);

  // Auth guard
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) nav("/auth", { replace: true }); else setUserId(data.session.user.id);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => { if (!s) nav("/auth", { replace: true }); });
    return () => sub.subscription.unsubscribe();
  }, [nav]);

  const loadJourneys = useCallback(async () => {
    const { data } = await supabase.from("journeys").select("*").order("updated_at", { ascending: false });
    setJourneys((data as JourneyRow[]) ?? []);
    return (data as JourneyRow[]) ?? [];
  }, []);

  const newJourney = useCallback(async () => {
    if (!userId) return;
    const { data, error } = await supabase.from("journeys").insert({ user_id: userId }).select().single();
    if (error) return toast.error(error.message);
    await loadJourneys();
    setMenuOpen(false);
    nav(`/journey/${data.id}`);
  }, [userId, nav, loadJourneys]);

  // Load journeys / pick default
  useEffect(() => {
    if (!userId) return;
    loadJourneys().then((list) => {
      if (!journeyId) {
        if (list[0]) nav(`/journey/${list[0].id}`, { replace: true }); else newJourney();
      }
    });
  }, [userId, journeyId]); // eslint-disable-line

  // Load messages for current journey
  useEffect(() => {
    if (!userId || !journeyId) return;
    let cancelled = false;
    setMessages([]); setImages([]); setStreaming(null); setDate(""); setPlace("");
    voiceRef.current?.stop(); setHandsFree(false);
    (async () => {
      const [{ data: m }, { data: im }] = await Promise.all([
        supabase.from("journey_messages").select("id,role,content").eq("journey_id", journeyId).order("created_at"),
        supabase.from("journey_images").select("id,message_id,image_url,alt_text").eq("journey_id", journeyId).order("created_at"),
      ]);
      if (cancelled) return;
      setMessages((m as Msg[]) ?? []);
      if (im?.length) {
        const { data: signed } = await supabase.storage.from("journey-images").createSignedUrls(im.map((i) => i.image_url), 60 * 60 * 24);
        if (!cancelled) setImages(im.map((i, k) => ({ id: i.id, message_id: i.message_id, alt_text: i.alt_text, url: signed?.[k]?.signedUrl ?? "" })));
      }
    })();
    return () => { cancelled = true; };
  }, [userId, journeyId]);

  const current = journeys.find((j) => j.id === journeyId);

  const generateImages = async (messageId: string) => {
    setImgLoading(messageId);
    try {
      const res = await fetch(`${FN}/journey-images`, { method: "POST", headers: await authHeaders(), body: JSON.stringify({ journeyId, messageId }) });
      if (!res.ok) throw new Error(await readError(res));
      const { images: rows } = await res.json();
      const { data: signed } = await supabase.storage.from("journey-images").createSignedUrls(rows.map((r: any) => r.image_url), 60 * 60 * 24);
      setImages((prev) => [...prev, ...rows.map((r: any, k: number) => ({ id: r.id, message_id: r.message_id, alt_text: r.alt_text, url: signed?.[k]?.signedUrl ?? "" }))]);
      sfx.imagesReady();
    } catch (e) {
      toast.error(`Images: ${(e as Error).message}`);
    } finally {
      setImgLoading(null);
    }
  };

  const playRitual = () => new Promise<void>((resolve) => {
    sfx.ritualStart();
    if (reduced) { setRitual(RITUAL.length - 1); setTimeout(() => { setRitual(-1); resolve(); }, 1200); return; }
    let i = 0; setRitual(0); sfx.ritualTick();
    const t = setInterval(() => {
      i++;
      if (i >= RITUAL.length + 1) { clearInterval(t); setRitual(-1); resolve(); }
      else { setRitual(Math.min(i, RITUAL.length - 1)); sfx.ritualTick(); }
    }, 900);
  });

  const send = async (text: string, viaVoice = false) => {
    if (!text.trim() || !journeyId || !userId || busy) return;
    unlockAudio(); // must run inside the tap so the guide's voice may play later
    if (!viaVoice) setHandsFree(false);
    sfx.send();
    voiceRef.current?.stop();
    setBusy(true); setInput("");
    const isFirst = messages.length === 0;
    const { data: um, error } = await supabase.from("journey_messages")
      .insert({ journey_id: journeyId, user_id: userId, role: "user", content: text }).select("id,role,content").single();
    if (error) { setBusy(false); return toast.error(error.message); }
    const history = [...messages, um as Msg];
    setMessages(history);
    if (isFirst) {
      const title = text.slice(0, 60);
      await supabase.from("journeys").update({ title, destination_date: date || null, destination_place: place || null, status: "traveling" }).eq("id", journeyId);
      loadJourneys();
    }
    const ritualP = isFirst ? playRitual() : Promise.resolve();

    const ctrl = new AbortController(); abortRef.current = ctrl;
    let full = "";
    // Speak the reply aloud while it streams, in order, paragraph by paragraph.
    const voice = voiceRef.current!;
    let spoken = 0;
    let voiceStarted = false;
    const feedVoice = (final: boolean) => {
      if (!voiceOnRef.current) return;
      if (!voiceStarted) { voice.begin("live"); voiceStarted = true; }
      const body = speakableBody(full.replace(/\[\[ERROR:.*\]\]/, ""));
      while (true) {
        const rest = body.slice(spoken);
        if (final) { if (rest.trim()) voice.enqueue(rest); spoken = body.length; voice.finish(); return; }
        const min = spoken === 0 ? 260 : 900;
        if (rest.length < min) return;
        let cut = rest.indexOf("\n", min);
        if (cut < 0 || cut > 1600) {
          const s = rest.slice(min).search(/[.!?…]["”’)]?\s/);
          cut = s >= 0 ? min + s + 1 : -1;
        }
        if (cut < 0) return;
        voice.enqueue(rest.slice(0, cut));
        spoken += cut;
      }
    };
    try {
      const res = await fetch(`${FN}/journey-chat`, {
        method: "POST", headers: await authHeaders(), signal: ctrl.signal,
        body: JSON.stringify({ messages: history.map((m) => ({ role: m.role, content: m.content })) }),
      });
      if (!res.ok || !res.body) throw new Error(await readError(res));
      await ritualP;
      setStreaming("");
      const reader = res.body.getReader(); const dec = new TextDecoder();
      let first = true;
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        full += dec.decode(value, { stream: true });
        if (first && full.trim()) { first = false; if (isFirst) sfx.arrival(); }
        setStreaming(full);
        feedVoice(false);
      }
    } catch (e) {
      if ((e as Error).name !== "AbortError") toast.error((e as Error).message);
    }
    await ritualP;
    const errMatch = full.match(/\[\[ERROR:(.*)\]\]/);
    if (errMatch) { toast.error(errMatch[1]); full = full.replace(errMatch[0], "").trim(); }
    if (ctrl.signal.aborted) voice.stop(); else if (full.trim()) feedVoice(true); else if (voiceStarted) voice.finish();
    setStreaming(null); abortRef.current = null;
    if (full.trim()) {
      const { data: am } = await supabase.from("journey_messages")
        .insert({ journey_id: journeyId, user_id: userId, role: "assistant", content: full }).select("id,role,content").single();
      if (am) {
        setMessages((p) => [...p, am as Msg]);
        await supabase.from("journeys").update({ status: "arrived" }).eq("id", journeyId);
        if (full.length > 800) generateImages(am.id);
      }
    } else if (!ctrl.signal.aborted && !errMatch) {
      toast.error("The guide didn't answer this time. Please send your message again.");
    }
    setBusy(false);
  };
  sendRef.current = (t: string) => send(t, true);

  const submitDestination = () => {
    if (!date.trim() || !place.trim()) return toast.error("Please choose both a date and a place.");
    send(`Take me to ${date.trim()} — ${place.trim()}.`);
  };

  const speak = (m: Msg) => {
    unlockAudio();
    const v = voiceRef.current!;
    if (speakingId === m.id) { v.stop(); return; }
    v.begin(m.id);
    splitForSpeech(m.content).forEach((c) => v.enqueue(c));
    v.finish();
  };

  const toggleVoice = () => {
    const on = !voiceOn;
    setVoiceOn(on);
    localStorage.setItem("tm-voice", on ? "on" : "off");
    if (!on) voiceRef.current?.stop();
    else unlockAudio();
  };
  const toggleSfx = () => { const on = !sfxOn; setSfxOn(on); setSfx(on); if (on) { unlockAudio(); sfx.send(); } };

  // Talk to the guide: speech-to-text in the browser, sent automatically when you stop speaking.
  const startListening = () => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) { toast.error("Voice input isn't available in this browser. Please try Chrome, Edge or Safari."); return; }
    if (busy) return;
    unlockAudio();
    voiceRef.current?.stop();
    let finalText = "";
    try {
      const rec = new SR();
      rec.lang = "en-US"; rec.interimResults = true; rec.continuous = false; rec.maxAlternatives = 1;
      rec.onresult = (e: any) => {
        let interim = "";
        for (let i = e.resultIndex; i < e.results.length; i++) {
          const r = e.results[i];
          if (r.isFinal) finalText += r[0].transcript; else interim += r[0].transcript;
        }
        setInput((finalText + " " + interim).trim());
      };
      rec.onerror = (e: any) => {
        if (e.error === "not-allowed" || e.error === "service-not-allowed") {
          setHandsFree(false);
          toast.error("Microphone access is blocked. Allow the microphone for this site, then tap the mic again.");
        } else if (e.error !== "no-speech" && e.error !== "aborted") toast.error(`Voice input: ${e.error}`);
      };
      rec.onend = () => {
        setListening(false); recRef.current = null; sfx.micOff();
        const t = finalText.trim();
        if (t) { setHandsFree(true); sendRef.current(t); }
      };
      rec.start(); recRef.current = rec; setListening(true); sfx.micOn();
    } catch {
      setListening(false);
    }
  };
  startListeningRef.current = startListening;
  const toggleMic = () => {
    if (listening) { setHandsFree(false); recRef.current?.stop(); return; }
    startListening();
  };

  const rename = async (j: JourneyRow) => {
    const title = prompt("Rename journey", j.title);
    if (!title?.trim()) return;
    await supabase.from("journeys").update({ title: title.trim() }).eq("id", j.id);
    loadJourneys();
  };
  const remove = async (j: JourneyRow) => {
    if (!confirm(`Delete "${j.title}"? This cannot be undone.`)) return;
    await supabase.from("journeys").delete().eq("id", j.id);
    const list = await loadJourneys();
    if (j.id === journeyId) nav(list[0] ? `/journey/${list[0].id}` : "/journey", { replace: true });
  };

  const rail = (
    <div className="flex h-full flex-col gap-3 p-3">
      <Button onClick={newJourney} className="w-full h-11 bg-amber-500 hover:bg-amber-400 text-black font-semibold"><Plus className="size-4 mr-1" />New journey</Button>
      <div className="flex-1 overflow-y-auto space-y-1">
        {journeys.map((j) => (
          <div key={j.id} className={`group flex items-center gap-1 rounded-lg px-2 py-2 text-sm ${j.id === journeyId ? "bg-amber-500/20 text-amber-100" : "text-amber-100/70 hover:bg-white/5"}`}>
            <Link to={`/journey/${j.id}`} onClick={() => setMenuOpen(false)} className="flex-1 truncate">{j.title}</Link>
            <button aria-label="Rename" onClick={() => rename(j)} className="p-1 opacity-60 hover:opacity-100"><Pencil className="size-3.5" /></button>
            <button aria-label="Delete" onClick={() => remove(j)} className="p-1 opacity-60 hover:opacity-100"><Trash2 className="size-3.5" /></button>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Button asChild variant="outline" size="sm" className="flex-1"><Link to="/"><Home className="size-4 mr-1" />Home</Link></Button>
        <Button variant="outline" size="sm" className="flex-1" onClick={() => supabase.auth.signOut()}><LogOut className="size-4 mr-1" />Sign out</Button>
      </div>
    </div>
  );

  return (
    <div className="flex h-[100dvh] bg-[radial-gradient(ellipse_at_top,hsl(35_70%_14%),hsl(0_0%_4%)_65%)] text-amber-50">
      <aside className="hidden md:block w-72 shrink-0 border-r border-amber-500/20 bg-black/40">{rail}</aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-2 border-b border-amber-500/20 bg-black/40 px-3 py-2">
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild><Button variant="ghost" size="icon" className="md:hidden" aria-label="Journeys"><Menu /></Button></SheetTrigger>
            <SheetContent side="left" className="w-72 p-0 bg-neutral-950 border-amber-500/20">{rail}</SheetContent>
          </Sheet>
          <img src={GUIDE_IMG} alt="" className={`size-9 shrink-0 rounded-full object-cover ring-2 ${speakingId ? "ring-red-500 animate-pulse" : "ring-amber-500/60"}`} />
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-sm font-semibold text-amber-300">Black History Matters Time Machine</h1>
            <p className="truncate text-xs text-amber-100/60">{speakingId ? "The guide is speaking…" : current?.title ?? "Guided by the Voice of the Dream"}</p>
          </div>
          {speakingId && (
            <Button size="sm" variant="outline" className="h-9 shrink-0 px-2" onClick={() => voiceRef.current?.stop()} aria-label="Stop voice">
              <Pause className="size-4 sm:mr-1" /><span className="hidden sm:inline">Stop voice</span>
            </Button>
          )}
          <Button size="sm" variant="ghost" className="h-9 shrink-0 px-2" onClick={toggleVoice} aria-label={voiceOn ? "Turn guide voice off" : "Turn guide voice on"} title="Guide speaks replies aloud">
            {voiceOn ? <Volume2 className="size-4 text-amber-300" /> : <VolumeX className="size-4 text-amber-100/50" />}
            <span className="ml-1 hidden sm:inline">{voiceOn ? "Voice on" : "Voice off"}</span>
          </Button>
          <Button size="sm" variant="ghost" className="h-9 shrink-0 px-2" onClick={toggleSfx} aria-label={sfxOn ? "Turn sound effects off" : "Turn sound effects on"} title="Sound effects">
            {sfxOn ? <Bell className="size-4 text-amber-300" /> : <BellOff className="size-4 text-amber-100/50" />}
            <span className="ml-1 hidden sm:inline">Effects</span>
          </Button>
        </header>

        <Conversation className="flex-1">
          <ConversationContent className="mx-auto w-full max-w-3xl gap-6 px-3 py-6 md:px-6">
            <Message from="assistant">
              <MessageContent>
                <div className="flex gap-3">
                  <img src={GUIDE_IMG} alt="" className="size-8 shrink-0 rounded-full object-cover" />
                  <p className="text-base leading-relaxed text-amber-100">{OPENING} ⏳🕊️</p>
                </div>
              </MessageContent>
            </Message>

            {messages.length === 0 && !busy && (
              <div className="rounded-2xl border border-amber-500/30 bg-black/40 p-4 space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Input value={date} onChange={(e) => setDate(e.target.value)} placeholder="Date (e.g. 1324, March 1965)" className="h-11" />
                  <Input value={place} onChange={(e) => setPlace(e.target.value)} placeholder="Place (e.g. Timbuktu, Mali Empire)" className="h-11" />
                </div>
                <Button onClick={submitDestination} className="w-full h-11 font-semibold text-white bg-gradient-to-r from-amber-600 via-red-700 to-green-700">Begin the sacred time transition ⏳🔥</Button>
              </div>
            )}

            {messages.map((m) => (
              <div key={m.id} className="space-y-3">
                <Message from={m.role}>
                  <MessageContent className={m.role === "user" ? "group-[.is-user]:bg-amber-500 group-[.is-user]:text-black" : ""}>
                    {m.role === "user" ? <p className="whitespace-pre-wrap">{m.content}</p> : <MessageResponse className="text-base leading-relaxed prose-invert">{m.content}</MessageResponse>}
                  </MessageContent>
                </Message>
                {m.role === "assistant" && (
                  <>
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" variant="outline" onClick={() => speak(m)}>
                        {speakingId === m.id ? <><Pause className="size-4 mr-1" />Stop voice</> : <><Volume2 className="size-4 mr-1" />Listen</>}
                      </Button>
                      {!images.some((i) => i.message_id === m.id) && imgLoading !== m.id && (
                        <Button size="sm" variant="outline" onClick={() => generateImages(m.id)}><ImageIcon className="size-4 mr-1" />Create 2 scene images</Button>
                      )}
                    </div>
                    {imgLoading === m.id && (
                      <div className="grid gap-3 sm:grid-cols-2">
                        {[0, 1].map((k) => (
                          <div key={k} className="aspect-video rounded-xl border border-amber-500/20 bg-amber-500/5 flex items-center justify-center animate-pulse">
                            <Loader2 className="size-5 animate-spin mr-2" /><span className="text-sm text-amber-100/70">Painting the surroundings…</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {images.some((i) => i.message_id === m.id) && (
                      <div className="grid gap-3 sm:grid-cols-2">
                        {images.filter((i) => i.message_id === m.id).map((img) => (
                          <figure key={img.id} className="space-y-1">
                            <button onClick={() => setViewer(img)} className="block w-full overflow-hidden rounded-xl border border-amber-500/30">
                              <img src={img.url} alt={img.alt_text} loading="lazy" className="aspect-video w-full object-cover transition-transform hover:scale-105" />
                            </button>
                            <figcaption className="text-xs text-amber-100/50">AI educational reconstruction — not a historical photograph.</figcaption>
                          </figure>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}

            {streaming !== null && (
              <Message from="assistant">
                <MessageContent>
                  {streaming ? <MessageResponse className="text-base leading-relaxed" isAnimating>{streaming}</MessageResponse> : <Shimmer>Opening the time rift…</Shimmer>}
                </MessageContent>
              </Message>
            )}
            {busy && streaming === null && ritual < 0 && <Shimmer>The guide is listening…</Shimmer>}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="border-t border-amber-500/20 bg-black/50 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <div className="mx-auto flex max-w-3xl items-end gap-2">
            <Textarea
              value={input} onChange={(e) => setInput(e.target.value)} rows={1}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
              placeholder={messages.length ? "Ask the guide, or say yes for 10 things to explore…" : "Or type your destination…"}
              className="min-h-[44px] max-h-40 resize-none text-base"
            />
            {busy && abortRef.current ? (
              <Button type="button" size="icon" className="h-11 w-11 shrink-0" onClick={() => abortRef.current?.abort()} aria-label="Stop"><Square className="size-4" /></Button>
            ) : (
              <Button type="submit" size="icon" disabled={busy || !input.trim()} className="h-11 w-11 shrink-0 bg-amber-500 hover:bg-amber-400 text-black" aria-label="Send"><Send className="size-4" /></Button>
            )}
          </div>
          <p className="mx-auto mt-1 max-w-3xl text-center text-[11px] text-amber-100/40">Educational AI simulation. AI can make mistakes — verify facts with the listed sources.</p>
        </form>
      </div>

      {ritual >= 0 && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-black/90 p-6 text-center">
          <div className={`size-40 rounded-full border-4 border-amber-500/70 shadow-[0_0_80px_hsl(40_90%_50%/0.6)] ${reduced ? "" : "animate-[spin_6s_linear_infinite]"} bg-[conic-gradient(from_0deg,hsl(45_100%_50%),hsl(0_75%_40%),hsl(120_50%_30%),hsl(45_100%_50%))] opacity-80`} />
          <div className="space-y-2 max-w-md">
            {RITUAL.slice(0, ritual + 1).map((l, i) => (
              <p key={i} className={`text-lg ${i === ritual ? "text-amber-300" : "text-amber-100/50"} ${i === RITUAL.length - 1 ? "font-bold tracking-widest" : ""}`}>{l}</p>
            ))}
          </div>
          <p className="text-2xl">⏳🔥📜🕊️📖🌍</p>
        </div>
      )}

      <Dialog open={!!viewer} onOpenChange={(o) => !o && setViewer(null)}>
        <DialogContent className="max-w-5xl p-2 bg-black border-amber-500/30">
          {viewer && (
            <div className="space-y-2">
              <img src={viewer.url} alt={viewer.alt_text} className="w-full rounded-lg" />
              <div className="flex items-center justify-between gap-2 px-1">
                <p className="text-xs text-amber-100/60">{viewer.alt_text}</p>
                <Button asChild size="sm" variant="outline"><a href={viewer.url} download target="_blank" rel="noreferrer"><Download className="size-4 mr-1" />Download</a></Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
