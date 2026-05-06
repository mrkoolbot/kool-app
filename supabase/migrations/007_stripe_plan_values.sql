-- Update plan check constraint to support new Stripe plan tiers
-- Change from ('free', 'premium') to ('starter', 'pro', 'unlimited')

-- Drop the old constraint
alter table profiles drop constraint "profiles_plan_check";

-- Add new constraint with updated plan values
alter table profiles add constraint "profiles_plan_check" check (plan in ('starter', 'pro', 'unlimited'));

-- Update any existing data to use new plan names
update profiles set plan = 'starter' where plan = 'free';
update profiles set plan = 'pro' where plan = 'premium';
