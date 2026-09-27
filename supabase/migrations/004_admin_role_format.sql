-- Product format for catalog filters
alter table public.products
  add column if not exists format text;

-- Seed empty descriptions
update public.products
set description = 'Série ' || name || ' — ' || kind || '. Rádi připravíme nabídku na míru podle metráže a vybrané barevné varianty.'
where coalesce(trim(description), '') = '';

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin',
    false
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated, anon;

update auth.users
set raw_app_meta_data =
  coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'::jsonb
where email = 'admin@obkladerie.cz';

drop policy if exists "Admin write categories" on public.categories;
drop policy if exists "Admin write category_types" on public.category_types;
drop policy if exists "Admin write products" on public.products;
drop policy if exists "Admin write product_images" on public.product_images;
drop policy if exists "Admin write product_colors" on public.product_colors;
drop policy if exists "Admin read inquiries" on public.inquiries;
drop policy if exists "Admin update inquiries" on public.inquiries;
drop policy if exists "Admin delete inquiries" on public.inquiries;

create policy "Admin write categories"
  on public.categories for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admin write category_types"
  on public.category_types for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admin write products"
  on public.products for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admin write product_images"
  on public.product_images for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admin write product_colors"
  on public.product_colors for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admin read inquiries"
  on public.inquiries for select
  to authenticated
  using (public.is_admin());

create policy "Admin update inquiries"
  on public.inquiries for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admin delete inquiries"
  on public.inquiries for delete
  to authenticated
  using (public.is_admin());

drop policy if exists "Authenticated upload media" on storage.objects;
drop policy if exists "Authenticated update media" on storage.objects;
drop policy if exists "Authenticated delete media" on storage.objects;

create policy "Admin upload media"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'media' and public.is_admin());

create policy "Admin update media"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'media' and public.is_admin())
  with check (bucket_id = 'media' and public.is_admin());

create policy "Admin delete media"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'media' and public.is_admin());
