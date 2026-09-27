-- Obkladérie schema for Supabase Postgres
-- Run in Supabase SQL Editor (or via supabase db push)

create extension if not exists "pgcrypto";

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  subtitle text not null default '',
  image_url text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.category_types (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.categories (id) on delete cascade,
  name text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  unique (category_id, name)
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null default '',
  kind text not null,
  category_id uuid not null references public.categories (id) on delete restrict,
  type_id uuid references public.category_types (id) on delete set null,
  price_amount numeric(12, 2) not null,
  price_unit text not null default 'Kč/m²',
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  url text not null,
  sort_order integer not null default 0
);

create table if not exists public.product_colors (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  hex text not null,
  name text,
  sort_order integer not null default 0
);

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  message text not null,
  status text not null default 'pending' check (status in ('pending', 'done')),
  is_new boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists products_category_id_idx on public.products (category_id);
create index if not exists products_featured_idx on public.products (featured);
create index if not exists inquiries_status_idx on public.inquiries (status);

alter table public.categories enable row level security;
alter table public.category_types enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.product_colors enable row level security;
alter table public.inquiries enable row level security;

-- Public read for catalog
create policy "Public read categories"
  on public.categories for select
  to anon, authenticated
  using (true);

create policy "Public read category_types"
  on public.category_types for select
  to anon, authenticated
  using (true);

create policy "Public read products"
  on public.products for select
  to anon, authenticated
  using (true);

create policy "Public read product_images"
  on public.product_images for select
  to anon, authenticated
  using (true);

create policy "Public read product_colors"
  on public.product_colors for select
  to anon, authenticated
  using (true);

-- Public can create inquiries
create policy "Public insert inquiries"
  on public.inquiries for insert
  to anon, authenticated
  with check (true);

-- Authenticated admin full access
create policy "Admin write categories"
  on public.categories for all
  to authenticated
  using (true)
  with check (true);

create policy "Admin write category_types"
  on public.category_types for all
  to authenticated
  using (true)
  with check (true);

create policy "Admin write products"
  on public.products for all
  to authenticated
  using (true)
  with check (true);

create policy "Admin write product_images"
  on public.product_images for all
  to authenticated
  using (true)
  with check (true);

create policy "Admin write product_colors"
  on public.product_colors for all
  to authenticated
  using (true)
  with check (true);

create policy "Admin read inquiries"
  on public.inquiries for select
  to authenticated
  using (true);

create policy "Admin update inquiries"
  on public.inquiries for update
  to authenticated
  using (true)
  with check (true);

create policy "Admin delete inquiries"
  on public.inquiries for delete
  to authenticated
  using (true);
