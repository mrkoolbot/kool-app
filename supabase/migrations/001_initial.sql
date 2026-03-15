-- KOOL Event Planning App — Initial Schema
-- The Koolture Group

-- Profiles (extends Supabase auth.users)
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  full_name text,
  plan text default 'free' check (plan in ('free', 'premium')),
  stripe_customer_id text,
  created_at timestamptz default now()
);

-- Events
create table if not exists events (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  name text not null,
  event_type text not null,
  event_date date,
  event_time time,
  location text,
  venue_name text,
  description text,
  theme text,
  color_palette text,
  budget_total numeric default 0,
  guest_count_estimate integer,
  status text default 'planning' check (status in ('planning', 'confirmed', 'completed')),
  is_public boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Guests
create table if not exists guests (
  id uuid default gen_random_uuid() primary key,
  event_id uuid references events(id) on delete cascade not null,
  first_name text not null,
  last_name text,
  email text,
  phone text,
  rsvp_status text default 'pending' check (rsvp_status in ('pending', 'attending', 'declined', 'maybe')),
  plus_one boolean default false,
  dietary_restrictions text,
  notes text,
  invited_at timestamptz default now(),
  responded_at timestamptz
);

-- Checklist items
create table if not exists checklist_items (
  id uuid default gen_random_uuid() primary key,
  event_id uuid references events(id) on delete cascade not null,
  category text not null,
  title text not null,
  description text,
  is_completed boolean default false,
  due_date date,
  assigned_to text,
  priority text default 'medium' check (priority in ('low', 'medium', 'high')),
  sort_order integer default 0,
  created_at timestamptz default now()
);

-- Vendors
create table if not exists vendors (
  id uuid default gen_random_uuid() primary key,
  event_id uuid references events(id) on delete cascade not null,
  category text not null,
  vendor_name text not null,
  contact_name text,
  email text,
  phone text,
  website text,
  price_quote numeric,
  deposit_amount numeric,
  deposit_paid boolean default false,
  balance_due numeric,
  balance_paid boolean default false,
  contract_signed boolean default false,
  notes text,
  status text default 'researching' check (status in ('researching', 'contacted', 'booked', 'confirmed', 'cancelled')),
  created_at timestamptz default now()
);

-- Budget items
create table if not exists budget_items (
  id uuid default gen_random_uuid() primary key,
  event_id uuid references events(id) on delete cascade not null,
  vendor_id uuid references vendors(id) on delete set null,
  category text not null,
  item_name text not null,
  estimated_cost numeric default 0,
  actual_cost numeric default 0,
  is_paid boolean default false,
  notes text,
  created_at timestamptz default now()
);

-- Timeline items
create table if not exists timeline_items (
  id uuid default gen_random_uuid() primary key,
  event_id uuid references events(id) on delete cascade not null,
  time_slot time,
  duration_minutes integer,
  title text not null,
  description text,
  location text,
  assigned_to text,
  sort_order integer default 0,
  created_at timestamptz default now()
);

-- Auto-create profile on signup
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', '')
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- Auto-update updated_at on events
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create or replace trigger events_updated_at
  before update on events
  for each row execute procedure update_updated_at();

-- Row Level Security
alter table profiles enable row level security;
alter table events enable row level security;
alter table guests enable row level security;
alter table checklist_items enable row level security;
alter table vendors enable row level security;
alter table budget_items enable row level security;
alter table timeline_items enable row level security;

-- Policies
create policy "users manage own profile" on profiles for all using (auth.uid() = id);
create policy "users manage own events" on events for all using (auth.uid() = user_id);
create policy "users manage own guests" on guests for all using (
  event_id in (select id from events where user_id = auth.uid())
);
create policy "users manage own checklist" on checklist_items for all using (
  event_id in (select id from events where user_id = auth.uid())
);
create policy "users manage own vendors" on vendors for all using (
  event_id in (select id from events where user_id = auth.uid())
);
create policy "users manage own budget" on budget_items for all using (
  event_id in (select id from events where user_id = auth.uid())
);
create policy "users manage own timeline" on timeline_items for all using (
  event_id in (select id from events where user_id = auth.uid())
);
-- Public RSVP read access
create policy "public can read rsvp events" on events for select using (is_public = true);
create policy "public can read rsvp guests" on guests for select using (
  event_id in (select id from events where is_public = true)
);
create policy "public can insert rsvp" on guests for insert with check (
  event_id in (select id from events where is_public = true)
);
