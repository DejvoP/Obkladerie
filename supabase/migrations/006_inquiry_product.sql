alter table public.inquiries
  add column if not exists product_name text;

update public.inquiries
set
  product_name = trim(substring(message from '^Produkt:\s*(.+)\n')),
  message = trim(regexp_replace(message, '^Produkt:\s*.+\n+', '', 'n'))
where product_name is null
  and message ~ '^Produkt:\s*';
