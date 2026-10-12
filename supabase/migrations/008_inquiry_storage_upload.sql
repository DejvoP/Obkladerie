-- Allow anonymous uploads only into media/inquiries/* (inquiry attachments)
create policy "Public upload inquiry attachments"
  on storage.objects for insert
  to anon, authenticated
  with check (
    bucket_id = 'media'
    and (storage.foldername(name))[1] = 'inquiries'
  );
