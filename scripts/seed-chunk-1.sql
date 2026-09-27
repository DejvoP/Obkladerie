do $$
declare
  v_cat uuid;
  v_type uuid;
  v_product uuid;
begin
  select id into v_cat from public.categories where slug = 'venkovni';
  select id into v_type from public.category_types where category_id = v_cat and name = 'Matný povrch';

  insert into public.products (slug, name, description, kind, category_id, type_id, price_amount, price_unit, featured)
  values ('basalt-graphite', 'Basalt Graphite', '', 'Venkovní dlažba · Matný povrch', v_cat, v_type, 1050, 'Kč/m²', false)
  on conflict (slug) do update set
    name = excluded.name,
    kind = excluded.kind,
    category_id = excluded.category_id,
    type_id = excluded.type_id,
    price_amount = excluded.price_amount,
    price_unit = excluded.price_unit,
    featured = excluded.featured
  returning id into v_product;

  if v_product is null then
    select id into v_product from public.products where slug = 'basalt-graphite';
  end if;

  delete from public.product_images where product_id = v_product;
  delete from public.product_colors where product_id = v_product;

  insert into public.product_images (product_id, url, sort_order)
  values (v_product, 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=700&q=80', 0);

  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#5C5C5C', 0);
  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#3D3D3D', 1);
end $$;

do $$
declare
  v_cat uuid;
  v_type uuid;
  v_product uuid;
begin
  select id into v_cat from public.categories where slug = 'obklady';
  select id into v_type from public.category_types where category_id = v_cat and name = 'Matný povrch';

  insert into public.products (slug, name, description, kind, category_id, type_id, price_amount, price_unit, featured)
  values ('lime-wash', 'Lime Wash', '', 'Obklad · Matný povrch', v_cat, v_type, 840, 'Kč/m²', false)
  on conflict (slug) do update set
    name = excluded.name,
    kind = excluded.kind,
    category_id = excluded.category_id,
    type_id = excluded.type_id,
    price_amount = excluded.price_amount,
    price_unit = excluded.price_unit,
    featured = excluded.featured
  returning id into v_product;

  if v_product is null then
    select id into v_product from public.products where slug = 'lime-wash';
  end if;

  delete from public.product_images where product_id = v_product;
  delete from public.product_colors where product_id = v_product;

  insert into public.product_images (product_id, url, sort_order)
  values (v_product, 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=700&q=80', 0);

  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#EDE6DC', 0);
  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#C2B8AA', 1);
end $$;

do $$
declare
  v_cat uuid;
  v_type uuid;
  v_product uuid;
begin
  select id into v_cat from public.categories where slug = 'dlazby';
  select id into v_type from public.category_types where category_id = v_cat and name = 'Lesklý povrch';

  insert into public.products (slug, name, description, kind, category_id, type_id, price_amount, price_unit, featured)
  values ('quartzite-pearl', 'Quartzite Pearl', '', 'Dlažba · Lesklý povrch', v_cat, v_type, 1290, 'Kč/m²', false)
  on conflict (slug) do update set
    name = excluded.name,
    kind = excluded.kind,
    category_id = excluded.category_id,
    type_id = excluded.type_id,
    price_amount = excluded.price_amount,
    price_unit = excluded.price_unit,
    featured = excluded.featured
  returning id into v_product;

  if v_product is null then
    select id into v_product from public.products where slug = 'quartzite-pearl';
  end if;

  delete from public.product_images where product_id = v_product;
  delete from public.product_colors where product_id = v_product;

  insert into public.product_images (product_id, url, sort_order)
  values (v_product, 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdbc?auto=format&fit=crop&w=700&q=80', 0);

  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#E8E8E8', 0);
  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#B0B0B0', 1);
end $$;

do $$
declare
  v_cat uuid;
  v_type uuid;
  v_product uuid;
begin
  select id into v_cat from public.categories where slug = 'obklady';
  select id into v_type from public.category_types where category_id = v_cat and name = 'Matný povrch';

  insert into public.products (slug, name, description, kind, category_id, type_id, price_amount, price_unit, featured)
  values ('terracotta-raw', 'Terracotta Raw', '', 'Obklad · Matný povrch', v_cat, v_type, 870, 'Kč/m²', false)
  on conflict (slug) do update set
    name = excluded.name,
    kind = excluded.kind,
    category_id = excluded.category_id,
    type_id = excluded.type_id,
    price_amount = excluded.price_amount,
    price_unit = excluded.price_unit,
    featured = excluded.featured
  returning id into v_product;

  if v_product is null then
    select id into v_product from public.products where slug = 'terracotta-raw';
  end if;

  delete from public.product_images where product_id = v_product;
  delete from public.product_colors where product_id = v_product;

  insert into public.product_images (product_id, url, sort_order)
  values (v_product, 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=700&q=80', 0);

  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#C4785A', 0);
  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#8B4A32', 1);
end $$;

do $$
declare
  v_cat uuid;
  v_type uuid;
  v_product uuid;
begin
  select id into v_cat from public.categories where slug = 'dlazby';
  select id into v_type from public.category_types where category_id = v_cat and name = 'Strukturovaný povrch';

  insert into public.products (slug, name, description, kind, category_id, type_id, price_amount, price_unit, featured)
  values ('granite-ash', 'Granite Ash', '', 'Dlažba · Strukturovaný povrch', v_cat, v_type, 990, 'Kč/m²', false)
  on conflict (slug) do update set
    name = excluded.name,
    kind = excluded.kind,
    category_id = excluded.category_id,
    type_id = excluded.type_id,
    price_amount = excluded.price_amount,
    price_unit = excluded.price_unit,
    featured = excluded.featured
  returning id into v_product;

  if v_product is null then
    select id into v_product from public.products where slug = 'granite-ash';
  end if;

  delete from public.product_images where product_id = v_product;
  delete from public.product_colors where product_id = v_product;

  insert into public.product_images (product_id, url, sort_order)
  values (v_product, 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=700&q=80', 0);

  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#8E8E8E', 0);
  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#5A5A5A', 1);
end $$;

do $$
declare
  v_cat uuid;
  v_type uuid;
  v_product uuid;
begin
  select id into v_cat from public.categories where slug = 'obklady';
  select id into v_type from public.category_types where category_id = v_cat and name = 'Hedvábný povrch';

  insert into public.products (slug, name, description, kind, category_id, type_id, price_amount, price_unit, featured)
  values ('ivory-silk', 'Ivory Silk', '', 'Obklad · Hedvábný povrch', v_cat, v_type, 1180, 'Kč/m²', false)
  on conflict (slug) do update set
    name = excluded.name,
    kind = excluded.kind,
    category_id = excluded.category_id,
    type_id = excluded.type_id,
    price_amount = excluded.price_amount,
    price_unit = excluded.price_unit,
    featured = excluded.featured
  returning id into v_product;

  if v_product is null then
    select id into v_product from public.products where slug = 'ivory-silk';
  end if;

  delete from public.product_images where product_id = v_product;
  delete from public.product_colors where product_id = v_product;

  insert into public.product_images (product_id, url, sort_order)
  values (v_product, 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=700&q=80', 0);

  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#F3EDE4', 0);
  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#D2C6B6', 1);
end $$;

do $$
declare
  v_cat uuid;
  v_type uuid;
  v_product uuid;
begin
  select id into v_cat from public.categories where slug = 'dlazby';
  select id into v_type from public.category_types where category_id = v_cat and name = 'Matný povrch';

  insert into public.products (slug, name, description, kind, category_id, type_id, price_amount, price_unit, featured)
  values ('cement-soft', 'Cement Soft', '', 'Dlažba · Matný povrch', v_cat, v_type, 720, 'Kč/m²', false)
  on conflict (slug) do update set
    name = excluded.name,
    kind = excluded.kind,
    category_id = excluded.category_id,
    type_id = excluded.type_id,
    price_amount = excluded.price_amount,
    price_unit = excluded.price_unit,
    featured = excluded.featured
  returning id into v_product;

  if v_product is null then
    select id into v_product from public.products where slug = 'cement-soft';
  end if;

  delete from public.product_images where product_id = v_product;
  delete from public.product_colors where product_id = v_product;

  insert into public.product_images (product_id, url, sort_order)
  values (v_product, 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=700&q=80', 0);

  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#C8C4BE', 0);
  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#8F8A84', 1);
end $$;

do $$
declare
  v_cat uuid;
  v_type uuid;
  v_product uuid;
begin
  select id into v_cat from public.categories where slug = 'obklady';
  select id into v_type from public.category_types where category_id = v_cat and name = 'Matný povrch';

  insert into public.products (slug, name, description, kind, category_id, type_id, price_amount, price_unit, featured)
  values ('travertin-noce', 'Travertin Noce', '', 'Obklad · Matný povrch', v_cat, v_type, 910, 'Kč/m²', false)
  on conflict (slug) do update set
    name = excluded.name,
    kind = excluded.kind,
    category_id = excluded.category_id,
    type_id = excluded.type_id,
    price_amount = excluded.price_amount,
    price_unit = excluded.price_unit,
    featured = excluded.featured
  returning id into v_product;

  if v_product is null then
    select id into v_product from public.products where slug = 'travertin-noce';
  end if;

  delete from public.product_images where product_id = v_product;
  delete from public.product_colors where product_id = v_product;

  insert into public.product_images (product_id, url, sort_order)
  values (v_product, 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=700&q=80', 0);

  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#B89A7A', 0);
  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#7A6248', 1);
end $$;