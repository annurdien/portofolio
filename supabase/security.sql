-- Enable necessary extensions
create extension if not exists moddatetime;

-- Profiles table stores per-user roles
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'viewer' check (role in ('viewer', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Keep updated_at fresh without relying on external extensions
create or replace function public.touch_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row
execute procedure public.touch_updated_at();

-- Helper to check if a user is an admin without triggering recursive RLS
create or replace function public.is_admin(uid uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists(
    select 1
    from public.profiles
    where id = uid
      and role = 'admin'
  );
$$;

-- Automatically provision a profile row for every new auth user
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, role)
  values (new.id, 'viewer')
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- Row Level Security for profiles
alter table public.profiles enable row level security;

drop policy if exists "users can read own profile" on public.profiles;
create policy "users can read own profile"
on public.profiles for select
using (auth.uid() = id);

drop policy if exists "admins manage profiles" on public.profiles;
create policy "admins manage profiles"
on public.profiles for all
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

-- Projects table policies
alter table public.projects enable row level security;

drop policy if exists "public can read projects" on public.projects;
create policy "public can read projects"
on public.projects for select
using (true);

drop policy if exists "admins manage projects" on public.projects;
create policy "admins manage projects"
on public.projects for all
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

alter table storage.objects enable row level security;

drop policy if exists "public read project-images" on storage.objects;
create policy "public read project-images"
on storage.objects for select
using (bucket_id = 'project-images');

drop policy if exists "admins manage project-images" on storage.objects;
create policy "admins manage project-images"
on storage.objects for all
using (
  bucket_id = 'project-images'
  and public.is_admin(auth.uid())
)
with check (
  bucket_id = 'project-images'
  and public.is_admin(auth.uid())
);