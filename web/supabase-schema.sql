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
