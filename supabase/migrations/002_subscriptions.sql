-- ============================================================
-- BabyCorp — Platform Subscriptions Schema
-- ============================================================

-- ── Enums ────────────────────────────────────────────────────
create type subscription_plan   as enum ('starter', 'growth', 'elite');
create type subscription_cycle  as enum ('monthly', 'annual');
create type subscription_status as enum ('active', 'expired', 'cancelled', 'past_due');
create type addon_type          as enum ('genetic_test', 'sports_psychology', 'blood_panel');
create type addon_status        as enum ('pending', 'completed', 'cancelled');


-- ── Platform Subscriptions ───────────────────────────────────
-- One row per child subscription. Parent buys one per child.
create table public.subscriptions (
  id                        uuid                primary key default gen_random_uuid(),
  parent_id                 uuid                not null references public.users(id) on delete cascade,
  child_id                  uuid                not null references public.children(id) on delete cascade,
  plan                      subscription_plan   not null,
  cycle                     subscription_cycle  not null default 'monthly',
  status                    subscription_status not null default 'active',
  current_period_start      date                not null default current_date,
  current_period_end        date                not null,
  razorpay_subscription_id  text                unique,
  razorpay_payment_id       text,
  amount_paid               numeric             not null,
  created_at                timestamptz         not null default now(),
  cancelled_at              timestamptz,

  -- Enforce one active subscription per child at a time
  constraint unique_active_child_subscription unique (child_id, status)
    deferrable initially deferred
);

alter table public.subscriptions enable row level security;

create policy "subscriptions_parent_all" on public.subscriptions for all
  using (auth.uid() = parent_id) with check (auth.uid() = parent_id);

create policy "subscriptions_admin_all" on public.subscriptions for all
  using (exists (select 1 from public.users u where u.id = auth.uid() and u.role = 'admin'));


-- ── One-time Add-ons ─────────────────────────────────────────
create table public.addons (
  id                    uuid          primary key default gen_random_uuid(),
  parent_id             uuid          not null references public.users(id) on delete cascade,
  child_id              uuid          not null references public.children(id) on delete cascade,
  subscription_id       uuid          references public.subscriptions(id) on delete set null,
  type                  addon_type    not null,
  status                addon_status  not null default 'pending',
  razorpay_payment_id   text,
  amount_paid           numeric       not null,
  notes                 text,
  scheduled_date        date,
  completed_at          timestamptz,
  report_url            text,
  created_at            timestamptz   not null default now()
);

alter table public.addons enable row level security;

create policy "addons_parent_all" on public.addons for all
  using (auth.uid() = parent_id) with check (auth.uid() = parent_id);

create policy "addons_admin_all" on public.addons for all
  using (exists (select 1 from public.users u where u.id = auth.uid() and u.role = 'admin'));


-- ── Subscription Price Reference ────────────────────────────
-- Not stored dynamically — these are the fixed platform prices.
-- Update here if you change pricing; historical rows keep amount_paid.
--
-- Plan      | Monthly | Annual
-- ----------+---------+--------
-- starter   |  ₹499   | ₹4,999
-- growth    |  ₹999   | ₹9,999
-- elite     | ₹2,499  | ₹24,999
--
-- Add-on    | Price
-- ----------+--------
-- genetic   | ₹9,999
-- psych     | ₹1,499
-- blood     | ₹2,999


-- ── Helper: auto-set period_end on insert ───────────────────
create or replace function public.set_subscription_period_end()
returns trigger language plpgsql as $$
begin
  if new.cycle = 'annual' then
    new.current_period_end := new.current_period_start + interval '1 year';
  else
    new.current_period_end := new.current_period_start + interval '1 month';
  end if;
  return new;
end;
$$;

create trigger subscription_set_period_end
  before insert on public.subscriptions
  for each row execute procedure public.set_subscription_period_end();
