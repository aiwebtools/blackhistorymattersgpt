import { createClient } from "npm:@supabase/supabase-js@2";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Access-Control-Expose-Headers": "X-Lovable-AIG-Run-ID",
};

export const GATEWAY = "https://ai.gateway.lovable.dev";

export function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

export async function getUserClient(req: Request) {
  const auth = req.headers.get("Authorization") ?? "";
  const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, {
    global: { headers: { Authorization: auth } },
  });
  const token = auth.replace(/^Bearer\s+/i, "");
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) return null;
  return { supabase, user: data.user };
}

export function gatewayHeaders(sdk = "fetch") {
  const key = Deno.env.get("LOVABLE_API_KEY")!;
  return {
    Authorization: `Bearer ${key}`,
    "Lovable-API-Key": key,
    "X-Lovable-AIG-SDK": sdk,
    "Content-Type": "application/json",
  };
}

export async function gatewayError(res: Response) {
  const text = await res.text();
  let message = text;
  try {
    const j = JSON.parse(text);
    message = j?.error?.message ?? j?.message ?? text;
  } catch { /* plain text */ }
  if (res.status === 402) message = message || "AI credits are used up. Add credits in Settings → Plans & credits.";
  if (res.status === 429) message = message || "The time machine is busy. Please wait a moment and try again.";
  return json({ error: message || `Request failed (${res.status})` }, res.status);
}
