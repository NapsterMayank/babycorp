-- ============================================================
-- BabyCorp — Initial Database Schema
-- Run via: supabase db push  OR  paste into Supabase SQL editor
-- ============================================================

-- ── Enums ────────────────────────────────────────────────────
create type user_role          as enum ('parent', 'academy', 'admin');
create type enrollment_type    as enum ('trial', 'monthly', 'quarterly', 'annual');
create type enrollment_status  as enum ('active', 'trial', 'paused', 'cancelled');
create type payment_status     as enum ('pending', 'paid', 'refunded', 'failed');


-- ── Users (profile table — extends auth.users) ───────────────
create table public.users (
  id                  uuid        primary key references auth.users(id) on delete cascade,
  email               text,
  mobile              text,
  name                text        not null,
  role                user_role   not null default 'parent',
  city                text,
  preferred_language  text        not null default 'English',
  referral_code       text        unique,
  avatar_url          text,
  created_at          timestamptz not null default now()
);

alter table public.users enable row level security;

create policy "users_select_own"  on public.users for select  using (auth.uid() = id);
create policy "users_insert_own"  on public.users for insert  with check (auth.uid() = id);
create policy "users_update_own"  on public.users for update  using (auth.uid() = id);

-- Admins can view all users
create policy "users_admin_select" on public.users for select
  using (exists (select 1 from public.users u where u.id = auth.uid() and u.role = 'admin'));


-- ── Children ─────────────────────────────────────────────────
create table public.children (
  id              uuid        primary key default gen_random_uuid(),
  parent_id       uuid        not null references public.users(id) on delete cascade,
  name            text        not null,
  dob             date        not null,
  gender          text        not null,
  sport_ids       text[]      not null default '{}',
  medical_notes   text,
  avatar_url      text,
  created_at      timestamptz not null default now()
);

alter table public.children enable row level security;

create policy "children_parent_all" on public.children for all
  using (auth.uid() = parent_id) with check (auth.uid() = parent_id);

-- Academy can view children enrolled in their batches
create policy "children_academy_select" on public.children for select
  using (
    id in (
      select e.child_id from public.enrollments e
      join public.batches b on e.batch_id = b.id
      join public.academies a on b.academy_id = a.id
      where a.owner_id = auth.uid()
    )
  );


-- ── Sports ───────────────────────────────────────────────────
create table public.sports (
  id           text    primary key,
  name         text    not null,
  icon_url     text,
  skill_rubric jsonb   not null default '{}',
  is_active    boolean not null default true
);

alter table public.sports enable row level security;

create policy "sports_public_select" on public.sports for select using (is_active = true);
create policy "sports_admin_all"     on public.sports for all
  using (exists (select 1 from public.users u where u.id = auth.uid() and u.role = 'admin'));


-- ── Academies ────────────────────────────────────────────────
create table public.academies (
  id               uuid    primary key default gen_random_uuid(),
  owner_id         uuid    not null references public.users(id) on delete cascade,
  name             text    not null,
  description      text,
  city             text    not null,
  address          text,
  lat              numeric,
  lng              numeric,
  verified         boolean not null default false,
  rating_avg       numeric not null default 0,
  bank_account_id  text,
  created_at       timestamptz not null default now()
);

alter table public.academies enable row level security;

create policy "academies_public_select" on public.academies for select using (verified = true);
create policy "academies_owner_select"  on public.academies for select using (auth.uid() = owner_id);
create policy "academies_owner_insert"  on public.academies for insert with check (auth.uid() = owner_id);
create policy "academies_owner_update"  on public.academies for update using (auth.uid() = owner_id);
create policy "academies_admin_all"     on public.academies for all
  using (exists (select 1 from public.users u where u.id = auth.uid() and u.role = 'admin'));


-- ── Batches (class schedules within an academy) ──────────────
create table public.batches (
  id              uuid    primary key default gen_random_uuid(),
  academy_id      uuid    not null references public.academies(id) on delete cascade,
  sport_id        text    not null references public.sports(id),
  name            text    not null,
  coach_name      text,
  age_min         integer not null,
  age_max         integer not null,
  max_students    integer not null default 15,
  schedule        jsonb   not null default '[]',
  price_monthly   numeric not null,
  price_quarterly numeric,
  price_annual    numeric,
  is_active       boolean not null default true,
  created_at      timestamptz not null default now()
);

alter table public.batches enable row level security;

create policy "batches_public_select" on public.batches for select using (is_active = true);
create policy "batches_owner_all"     on public.batches for all
  using (
    academy_id in (select id from public.academies where owner_id = auth.uid())
  )
  with check (
    academy_id in (select id from public.academies where owner_id = auth.uid())
  );


-- ── Enrollments ──────────────────────────────────────────────
create table public.enrollments (
  id          uuid              primary key default gen_random_uuid(),
  child_id    uuid              not null references public.children(id),
  batch_id    uuid              not null references public.batches(id),
  parent_id   uuid              not null references public.users(id),
  type        enrollment_type   not null,
  status      enrollment_status not null default 'trial',
  start_date  date              not null,
  end_date    date,
  auto_renew  boolean           not null default false,
  created_at  timestamptz       not null default now()
);

alter table public.enrollments enable row level security;

create policy "enrollments_parent_all" on public.enrollments for all
  using (auth.uid() = parent_id) with check (auth.uid() = parent_id);

create policy "enrollments_academy_select" on public.enrollments for select
  using (
    batch_id in (
      select b.id from public.batches b
      join public.academies a on b.academy_id = a.id
      where a.owner_id = auth.uid()
    )
  );

create policy "enrollments_admin_all" on public.enrollments for all
  using (exists (select 1 from public.users u where u.id = auth.uid() and u.role = 'admin'));


-- ── Payments ─────────────────────────────────────────────────
create table public.payments (
  id                   uuid           primary key default gen_random_uuid(),
  enrollment_id        uuid           not null references public.enrollments(id),
  parent_id            uuid           not null references public.users(id),
  academy_id           uuid           not null references public.academies(id),
  amount               numeric        not null,
  status               payment_status not null default 'pending',
  razorpay_payment_id  text,
  created_at           timestamptz    not null default now()
);

alter table public.payments enable row level security;

create policy "payments_parent_select" on public.payments for select using (auth.uid() = parent_id);
create policy "payments_parent_insert" on public.payments for insert with check (auth.uid() = parent_id);
create policy "payments_academy_select" on public.payments for select
  using (academy_id in (select id from public.academies where owner_id = auth.uid()));
create policy "payments_admin_all" on public.payments for all
  using (exists (select 1 from public.users u where u.id = auth.uid() and u.role = 'admin'));


-- ── Seed sports ──────────────────────────────────────────────
insert into public.sports (id, name, is_active) values
  ('chess',       'Chess',       true),
  ('swimming',    'Swimming',    true),
  ('cricket',     'Cricket',     true),
  ('badminton',   'Badminton',   true),
  ('gymnastics',  'Gymnastics',  true);


-- ── Helper: auto-create profile on first sign-in (optional) ──
-- If you want Supabase to auto-insert a minimal profile row
-- when a user signs up via Google/email without going through
-- the register wizard, enable this trigger:
--
-- create or replace function public.handle_new_user()
-- returns trigger language plpgsql security definer as $$
-- begin
--   insert into public.users (id, email, name, role)
--   values (
--     new.id,
--     new.email,
--     coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
--     'parent'
--   )
--   on conflict (id) do nothing;
--   return new;
-- end;
-- $$;
--
-- create trigger on_auth_user_created
--   after insert on auth.users
--   for each row execute procedure public.handle_new_user();
