-- Add tags and view count for ranking and discovery
alter table stories
  add column if not exists tags text[] not null default '{}'::text[];

alter table stories
  add column if not exists views integer not null default 0;

create index if not exists stories_views_created_at_idx
  on stories (views desc, created_at desc);
