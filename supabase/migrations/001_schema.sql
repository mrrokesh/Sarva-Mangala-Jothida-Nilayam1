-- Celestial Path e-commerce schema
-- Apply in the Supabase SQL editor or via CLI.

create table if not exists public.products (
  slug text primary key,
  title text not null,
  category text not null,
  price integer not null,
  excerpt text,
  description text,
  is_new boolean default false,
  featured text,
  requires_birth_details boolean default true
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text,
  email text,
  mobile text,
  address text,
  city text,
  pincode text,
  amount integer not null,
  status text not null default 'pending',
  payment_id text,
  razorpay_order_id text,
  items jsonb,
  created_at timestamptz default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id) on delete cascade,
  slug text,
  title text,
  price integer,
  qty integer default 1,
  birth_details jsonb
);

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  "fullName" text,
  dob text,
  gender text,
  pob text,
  tob text,
  email text,
  whatsapp text,
  message text,
  created_at timestamptz default now()
);

create table if not exists public.blog_posts (
  slug text primary key,
  title text not null,
  date date,
  excerpt text,
  content text
);

alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.enquiries enable row level security;
alter table public.blog_posts enable row level security;

create policy "public read products" on public.products for select using (true);
create policy "public read posts" on public.blog_posts for select using (true);
create policy "public insert orders" on public.orders for insert with check (true);
create policy "public insert order_items" on public.order_items for insert with check (true);
create policy "public insert enquiries" on public.enquiries for insert with check (true);
