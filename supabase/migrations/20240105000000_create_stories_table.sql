create table stories (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  author text,
  content jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table stories enable row level security;

-- Allow public read of stories
create policy "Enable read access for all users"
on stories for select
to public
using (true);

-- Allow public creation of stories
create policy "Enable insert access for all users"
on stories for insert
to public
with check (true);
