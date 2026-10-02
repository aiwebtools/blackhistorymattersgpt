import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function Auth() {
  const nav = useNavigate();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => data.session && nav("/journey", { replace: true }));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => s && nav("/journey", { replace: true }));
    return () => sub.subscription.unsubscribe();
  }, [nav]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = mode === "in"
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/journey` } });
    setBusy(false);
    if (error) return toast.error(error.message);
    if (mode === "up") toast.success("Check your email to confirm your account, then sign in.");
  };

  const google = async () => {
    const res: any = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + "/auth" });
    if (res?.error) toast.error(res.error.message ?? "Google sign-in failed");
  };

  return (
    <main className="min-h-[100dvh] flex items-center justify-center p-4 bg-[radial-gradient(ellipse_at_top,hsl(40_80%_20%),hsl(0_0%_4%)_70%)]">
      <div className="w-full max-w-sm rounded-2xl border border-amber-500/30 bg-black/60 backdrop-blur p-6 space-y-5">
        <div className="text-center space-y-1">
          <img src="/lovable-uploads/4e17cfa0-fbe7-4cda-abc2-9d4deab16961.png" alt="" className="w-16 h-16 mx-auto rounded-full object-cover" />
          <h1 className="text-xl font-bold text-amber-300">Enter the Time Machine</h1>
          <p className="text-sm text-amber-100/70">Sign in to save your journeys through Black history.</p>
        </div>
        <Button type="button" variant="outline" className="w-full h-11" onClick={google}>Continue with Google</Button>
        <form onSubmit={submit} className="space-y-3">
          <Input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-11" />
          <Input type="password" required minLength={6} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="h-11" />
          <Button type="submit" disabled={busy} className="w-full h-11 bg-amber-500 hover:bg-amber-400 text-black font-semibold">
            {busy ? "Please wait…" : mode === "in" ? "Sign in" : "Create account"}
          </Button>
        </form>
        <button type="button" className="w-full text-sm text-amber-200/80 underline" onClick={() => setMode(mode === "in" ? "up" : "in")}>
          {mode === "in" ? "New traveler? Create an account" : "Already have an account? Sign in"}
        </button>
      </div>
    </main>
  );
}
