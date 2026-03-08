
-- Add email column to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email text;

-- Unique index on email for upsert logic
CREATE UNIQUE INDEX IF NOT EXISTS profiles_email_unique ON public.profiles (email) WHERE email IS NOT NULL;

-- Allow anonymous inserts for checkout leads
CREATE POLICY "Allow anonymous insert for checkout leads"
ON public.profiles
FOR INSERT
TO anon
WITH CHECK (true);
