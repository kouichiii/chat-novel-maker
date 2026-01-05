-- Allow public update of stories (required for upsert/editing)
create policy "Enable update access for all users"
on stories for update
to public
using (true)
with check (true);
