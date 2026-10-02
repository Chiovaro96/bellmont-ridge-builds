CREATE TABLE public.project_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 2 AND 100),
  email text NOT NULL CHECK (char_length(email) <= 255),
  phone text NOT NULL CHECK (char_length(phone) BETWEEN 7 AND 30),
  project_type text NOT NULL CHECK (project_type IN ('Kitchen remodel', 'Bathroom remodel', 'Exterior remodel', 'Whole-home renovation', 'Other')),
  project_description text NOT NULL CHECK (char_length(project_description) BETWEEN 20 AND 2000),
  preferred_timeline text NOT NULL CHECK (preferred_timeline IN ('As soon as possible', '1–3 months', '3–6 months', '6–12 months', 'Just exploring')),
  consultation_requested boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.project_inquiries TO service_role;

ALTER TABLE public.project_inquiries ENABLE ROW LEVEL SECURITY;

COMMENT ON TABLE public.project_inquiries IS 'Private homeowner renovation inquiries submitted through the public website.';