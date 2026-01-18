-- Stories table security constraints

-- 1. Add check constraint for content size (approx 300KB)
-- Normal use case: 1 story < 10KB. 100KB is plenty. 300KB is safe upper bound.
alter table stories add constraint stories_content_size_check
  check (octet_length(content::text) < 300000);

-- 2. Add check constraint for title length
alter table stories add constraint stories_title_length_check
  check (char_length(title) <= 100);

-- 3. Add check constraint for author/handle name length
alter table stories add constraint stories_author_length_check
  check (char_length(author) <= 50);

-- 4. Add check constraint for tags array length (max 10 tags)
alter table stories add constraint stories_tags_length_check
  check (array_length(tags, 1) <= 10);
