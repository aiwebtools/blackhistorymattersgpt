import { corsHeaders, GATEWAY, gatewayError, gatewayHeaders, getUserClient, json } from "../_shared/journey.ts";

function b64ToBytes(b64: string) {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const ctx = await getUserClient(req);
    if (!ctx) return json({ error: "Please sign in." }, 401);
    const { supabase, user } = ctx;
    const { journeyId, messageId } = await req.json();

    const { data: msg } = await supabase.from("journey_messages").select("content").eq("id", messageId).eq("journey_id", journeyId).single();
    const { data: journey } = await supabase.from("journeys").select("destination_date,destination_place,title").eq("id", journeyId).single();
    if (!msg || !journey) return json({ error: "Journey not found." }, 404);

    const setting = [journey.destination_date, journey.destination_place].filter(Boolean).join(", ") || journey.title;
    const excerpt = msg.content.replace(/[#*_>`\[\]]/g, "").slice(0, 1400);
    const base = `Photorealistic, historically accurate 16:9 cinematic photograph, natural light, 4K detail. Setting: ${setting}. Black people of that era and region shown with dignity, period-accurate clothing, architecture, tools and landscape. No text, no logos, no modern objects. Scene context: ${excerpt}`;
    const prompts = [
      `${base}\nComposition: wide establishing view of the surroundings and landscape.`,
      `${base}\nComposition: eye-level view among the people, community life and daily activity.`,
    ];

    const results = await Promise.all(prompts.map(async (prompt, i) => {
      const res = await fetch(`${GATEWAY}/v1/images/generations`, {
        method: "POST",
        headers: gatewayHeaders(),
        body: JSON.stringify({ model: "openai/gpt-image-2.5-sunburst", prompt, size: "1536x1024", n: 1 }),
      });
      if (!res.ok) return { error: res };
      const data = await res.json();
      const b64 = data?.data?.[0]?.b64_json;
      if (!b64) return { error: null as Response | null, message: "No image returned." };
      const path = `${user.id}/${journeyId}/${messageId}-${i}-${Date.now()}.png`;
      const up = await supabase.storage.from("journey-images").upload(path, b64ToBytes(b64), { contentType: "image/png" });
      if (up.error) return { error: null, message: up.error.message };
      const alt = i === 0 ? `Reconstruction of the surroundings: ${setting}` : `Reconstruction of community life: ${setting}`;
      const { data: row, error } = await supabase.from("journey_images").insert({
        journey_id: journeyId, message_id: messageId, user_id: user.id, image_url: path, prompt, alt_text: alt,
      }).select().single();
      if (error) return { error: null, message: error.message };
      return { row };
    }));

    const rows = results.filter((r) => "row" in r).map((r: any) => r.row);
    if (rows.length === 0) {
      const failed = results.find((r: any) => r.error) as any;
      if (failed?.error) return await gatewayError(failed.error);
      return json({ error: (results[0] as any).message ?? "Image generation failed." }, 500);
    }
    return json({ images: rows });
  } catch (e) {
    return json({ error: (e as Error).message }, 500);
  }
});
