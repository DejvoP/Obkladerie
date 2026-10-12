alter table public.inquiries
  add column if not exists attachment_urls text[] not null default '{}';
