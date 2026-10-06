# Project rules

- All Time Machine audio (sound effects, guide voice queue, mic unlock) lives in `src/lib/guideAudio.ts` and plays through one shared AudioContext unlocked on a user tap — mobile browsers block audio started later without it.
- Guide voice is fetched in ordered parts with at most two requests in flight — keeps speech continuous without hitting rate limits.
- Voice input uses the browser's built-in speech recognition — no extra server cost and works in Chrome, Edge and Safari.
