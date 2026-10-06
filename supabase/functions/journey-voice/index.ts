import { corsHeaders, GATEWAY, gatewayError, gatewayHeaders, getUserClient, json } from "../_shared/journey.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const ctx = await getUserClient(req);
    if (!ctx) return json({ error: "Please sign in." }, 401);
    const { text } = await req.json();
    const clean = String(text ?? "")
      .replace(/\p{Extended_Pictographic}|\uFE0F|\u200D/gu, "")
      .replace(/[#*_>`~|]/g, "")
      .slice(0, 2500);
    if (!clean.trim()) return json({ error: "Nothing to read." }, 400);

    const res = await fetch(`${GATEWAY}/v1/audio/speech`, {
      method: "POST",
      headers: gatewayHeaders(),
      body: JSON.stringify({
        model: "google/gemini-3.1-flash-tts-preview",
        contents: [{
          role: "user",
          parts: [{ text: `Perform this as a living human storyteller, not a narrator reading text: a deep, warm, resonant baritone in the tradition of a 1960s Southern Black Baptist preacher and civil rights orator. Natural breaths, a gentle Southern cadence, unhurried and measured, swelling with moral conviction on key truths, softening with tenderness on sorrow, and letting meaningful pauses land. Speak only the words below:\n\n${clean}` }],
        }],
        generationConfig: {
          responseModalities: ["AUDIO"],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: "Charon" } } },
        },
      }),
    });
    if (!res.ok) return await gatewayError(res);
    return new Response(res.body, {
      headers: { ...corsHeaders, "Content-Type": res.headers.get("Content-Type") ?? "audio/wav" },
    });
  } catch (e) {
    return json({ error: (e as Error).message }, 500);
  }
});
