-- Allow public update of stories (required for upsert/editing)
-- ポリシーが既に存在していてもエラーにならないよう、安全に作り直す
drop policy if exists "Enable update access for all users" on stories;

create policy "Enable update access for all users"
on stories for update
to public
using (true)
with check (true);
