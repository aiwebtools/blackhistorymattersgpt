CREATE TABLE public.journeys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  title TEXT NOT NULL DEFAULT 'New journey',
  destination_date TEXT,
  destination_place TEXT,
  status TEXT NOT NULL DEFAULT 'awaiting_destination' CHECK (status IN ('awaiting_destination', 'traveling', 'arrived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.journeys TO authenticated;
GRANT ALL ON public.journeys TO service_role;
ALTER TABLE public.journeys ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Travelers can view their journeys" ON public.journeys FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Travelers can create their journeys" ON public.journeys FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Travelers can update their journeys" ON public.journeys FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Travelers can delete their journeys" ON public.journeys FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TABLE public.journey_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  journey_id UUID NOT NULL REFERENCES public.journeys(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  sources JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.journey_messages TO authenticated;
GRANT ALL ON public.journey_messages TO service_role;
ALTER TABLE public.journey_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Travelers can view their journey messages" ON public.journey_messages FOR SELECT TO authenticated USING (auth.uid() = user_id AND EXISTS (SELECT 1 FROM public.journeys j WHERE j.id = journey_id AND j.user_id = auth.uid()));
CREATE POLICY "Travelers can create their journey messages" ON public.journey_messages FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id AND EXISTS (SELECT 1 FROM public.journeys j WHERE j.id = journey_id AND j.user_id = auth.uid()));
CREATE POLICY "Travelers can update their journey messages" ON public.journey_messages FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Travelers can delete their journey messages" ON public.journey_messages FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TABLE public.journey_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  journey_id UUID NOT NULL REFERENCES public.journeys(id) ON DELETE CASCADE,
  message_id UUID NOT NULL REFERENCES public.journey_messages(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  image_url TEXT NOT NULL,
  prompt TEXT NOT NULL,
  alt_text TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.journey_images TO authenticated;
GRANT ALL ON public.journey_images TO service_role;
ALTER TABLE public.journey_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Travelers can view their journey images" ON public.journey_images FOR SELECT TO authenticated USING (auth.uid() = user_id AND EXISTS (SELECT 1 FROM public.journeys j WHERE j.id = journey_id AND j.user_id = auth.uid()));
CREATE POLICY "Travelers can create their journey images" ON public.journey_images FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id AND EXISTS (SELECT 1 FROM public.journeys j WHERE j.id = journey_id AND j.user_id = auth.uid()));
CREATE POLICY "Travelers can update their journey images" ON public.journey_images FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Travelers can delete their journey images" ON public.journey_images FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE INDEX journeys_user_updated_idx ON public.journeys(user_id, updated_at DESC);
CREATE INDEX journey_messages_journey_created_idx ON public.journey_messages(journey_id, created_at ASC);
CREATE INDEX journey_images_message_created_idx ON public.journey_images(message_id, created_at ASC);

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;
CREATE TRIGGER set_journeys_updated_at BEFORE UPDATE ON public.journeys FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();