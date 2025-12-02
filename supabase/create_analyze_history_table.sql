-- Run this SQL in Supabase SQL Editor to create the `analyze_history` table.

CREATE TABLE IF NOT EXISTS public.analyze_history (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  url text,
  performance_score integer,
  seo_score integer,
  accessibility_score integer,
  best_practices_score integer,
  total_score integer,
  report text,
  report_items jsonb,
  analyzed_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Recommended: grant insert/select to anon role if needed (use with caution):
-- GRANT INSERT, SELECT ON public.analyze_history TO anon;
