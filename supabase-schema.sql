create extension if not exists pgcrypto;

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 80),
  rating integer not null check (rating between 1 and 5),
  message text not null check (char_length(message) between 1 and 1000),
  likes integer not null default 0 check (likes >= 0),
  approved boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.reviews enable row level security;

drop policy if exists "Anyone can read approved reviews" on public.reviews;
create policy "Anyone can read approved reviews"
  on public.reviews for select
  using (approved = true);

drop policy if exists "Anyone can submit reviews" on public.reviews;
create policy "Anyone can submit reviews"
  on public.reviews for insert
  with check (approved = true);

drop policy if exists "Anyone can update review likes" on public.reviews;
create policy "Anyone can update review likes"
  on public.reviews for update
  using (approved = true)
  with check (approved = true);
grant select, insert, update on public.reviews to anon, authenticated;
