alter table stories
  add column if not exists is_listed boolean not null default true;
