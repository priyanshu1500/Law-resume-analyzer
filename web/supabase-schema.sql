-- LawAnalyser — Supabase schema
-- Run once in the Supabase SQL editor after creating the project.

-- 1. Saved questionnaire responses (one row per user) ----------------
create table if not exists public.responses (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  data       jsonb not null default '{}'::jsonb,   -- { "Q1": [0,1], "Q3": 3, ... }
  fit_done   boolean not null default false,
  updated_at timestamptz not null default now()
);

alter table public.responses enable row level security;

drop policy if exists "own responses" on public.responses;
create policy "own responses" on public.responses
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- 2. Paid entitlements (₹99 analysis, ₹499 rewrite) ----------------
--    Reads are user-scoped; writes happen only from the payment
--    webhook using the service-role key.
create table if not exists public.entitlements (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users (id) on delete cascade,
  product    text not null check (product in ('analysis', 'rewrite')),
  status     text not null default 'active' check (status in ('active', 'refunded')),
  order_ref  text,
  amount     integer,
  currency   text default 'INR',
  granted_at timestamptz not null default now()
);

create unique index if not exists entitlements_user_product_order
  on public.entitlements (user_id, product, coalesce(order_ref, ''));

alter table public.entitlements enable row level security;

drop policy if exists "read own entitlements" on public.entitlements;
create policy "read own entitlements" on public.entitlements
  for select using (auth.uid() = user_id);
-- no insert/update/delete policy -> only the service role can write.

-- 3. Uploaded resume metadata (Phase 5 — upload pipeline security) --
--    The file itself lives in the private "resumes" storage bucket at
--    resumes/{user_id}/{uuid}-{original filename}; this table is the
--    queryable index + what the retention cron deletes against.
create table if not exists public.resumes (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references auth.users (id) on delete cascade,
  storage_path   text not null,
  original_name  text not null,
  mime           text not null,
  size_bytes     integer not null,
  uploaded_at    timestamptz not null default now()
);

create index if not exists resumes_user_id on public.resumes (user_id);
create index if not exists resumes_uploaded_at on public.resumes (uploaded_at);

alter table public.resumes enable row level security;

drop policy if exists "own resumes" on public.resumes;
create policy "own resumes" on public.resumes
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- 4. Private storage bucket + per-user folder policies ---------------
--    Path convention enforced by policy, not just by convention:
--    storage.foldername(name)[1] must equal the caller's own uid, so a
--    user can only read/write/delete objects under their own folder.
insert into storage.buckets (id, name, public)
  values ('resumes', 'resumes', false)
  on conflict (id) do nothing;

drop policy if exists "own resume folder read" on storage.objects;
create policy "own resume folder read" on storage.objects
  for select using (bucket_id = 'resumes' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "own resume folder insert" on storage.objects;
create policy "own resume folder insert" on storage.objects
  for insert with check (bucket_id = 'resumes' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "own resume folder delete" on storage.objects;
create policy "own resume folder delete" on storage.objects
  for delete using (bucket_id = 'resumes' and (storage.foldername(name))[1] = auth.uid()::text);
-- no update policy: files are replaced by delete + re-upload, never edited in place.

-- Retention: originals are deleted automatically after 30 days by the
-- /api/cron/cleanup-resumes route (see vercel.json's cron entry), which
-- uses the service-role key to remove both the storage object and this
-- row. There is no in-database scheduled job (pg_cron) — the Vercel Cron
-- keeps deletion logic in one place (application code) rather than split
-- between SQL and TypeScript.
