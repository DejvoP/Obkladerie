
do $$
declare
  v_cat uuid;
  v_type uuid;
  v_product uuid;
begin
  select id into v_cat from public.categories where slug = 'obklady';
  select id into v_type from public.category_types where category_id = v_cat and name = 'Matný povrch';

  insert into public.products (slug, name, description, kind, category_id, type_id, price_amount, price_unit, featured)
  values ('travertin-beige', 'Travertin Beige', '', 'Obklad · Matný povrch', v_cat, v_type, 890, 'Kč/m²', true)
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
    select id into v_product from public.products where slug = 'travertin-beige';
  end if;

  delete from public.product_images where product_id = v_product;
  delete from public.product_colors where product_id = v_product;

  insert into public.product_images (product_id, url, sort_order)
  values (v_product, 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=700&q=80', 0);

  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#C9B29A', 0);
  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#8A7F72', 1);
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
  values ('marble-white', 'Marble White', '', 'Dlažba · Lesklý povrch', v_cat, v_type, 1240, 'Kč/m²', true)
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
    select id into v_product from public.products where slug = 'marble-white';
  end if;

  delete from public.product_images where product_id = v_product;
  delete from public.product_colors where product_id = v_product;

  insert into public.product_images (product_id, url, sort_order)
  values (v_product, 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=700&q=80', 0);

  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#F5F1EC', 0);
  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#D6D2CD', 1);
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
  values ('concrete-grey', 'Concrete Grey', '', 'Dlažba · Matný povrch', v_cat, v_type, 760, 'Kč/m²', true)
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
    select id into v_product from public.products where slug = 'concrete-grey';
  end if;

  delete from public.product_images where product_id = v_product;
  delete from public.product_colors where product_id = v_product;

  insert into public.product_images (product_id, url, sort_order)
  values (v_product, 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=700&q=80', 0);

  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#9A9A9A', 0);
  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#6F6F6F', 1);
end $$;


do $$
declare
  v_cat uuid;
  v_type uuid;
  v_product uuid;
begin
  select id into v_cat from public.categories where slug = 'obklady';
  select id into v_type from public.category_types where category_id = v_cat and name = 'Strukturovaný povrch';

  insert into public.products (slug, name, description, kind, category_id, type_id, price_amount, price_unit, featured)
  values ('stone-sand', 'Stone Sand', '', 'Obklad · Strukturovaný povrch', v_cat, v_type, 980, 'Kč/m²', true)
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
    select id into v_product from public.products where slug = 'stone-sand';
  end if;

  delete from public.product_images where product_id = v_product;
  delete from public.product_colors where product_id = v_product;

  insert into public.product_images (product_id, url, sort_order)
  values (v_product, 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=700&q=80', 0);

  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#D4C4B0', 0);
  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#A89078', 1);
end $$;


do $$
declare
  v_cat uuid;
  v_type uuid;
  v_product uuid;
begin
  select id into v_cat from public.categories where slug = 'dlazby';
  select id into v_type from public.category_types where category_id = v_cat and name = 'Mramorový efekt';

  insert into public.products (slug, name, description, kind, category_id, type_id, price_amount, price_unit, featured)
  values ('terrazzo-light', 'Terrazzo Light', '', 'Dlažba · Mramorový efekt', v_cat, v_type, 1150, 'Kč/m²', true)
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
    select id into v_product from public.products where slug = 'terrazzo-light';
  end if;

  delete from public.product_images where product_id = v_product;
  delete from public.product_colors where product_id = v_product;

  insert into public.product_images (product_id, url, sort_order)
  values (v_product, 'https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=700&q=80', 0);

  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#E8E2DA', 0);
  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#B8A99A', 1);
end $$;


do $$
declare
  v_cat uuid;
  v_type uuid;
  v_product uuid;
begin
  select id into v_cat from public.categories where slug = 'obklady';
  select id into v_type from public.category_types where category_id = v_cat and name = 'Dřevodekor';

  insert into public.products (slug, name, description, kind, category_id, type_id, price_amount, price_unit, featured)
  values ('oak-fluted', 'Oak Fluted', '', 'Obklad · Dřevodekor', v_cat, v_type, 1090, 'Kč/m²', false)
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
    select id into v_product from public.products where slug = 'oak-fluted';
  end if;

  delete from public.product_images where product_id = v_product;
  delete from public.product_colors where product_id = v_product;

  insert into public.product_images (product_id, url, sort_order)
  values (v_product, 'https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?auto=format&fit=crop&w=700&q=80', 0);

  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#B8956A', 0);
  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#7A5C3E', 1);
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
  values ('slate-dark', 'Slate Dark', '', 'Dlažba · Matný povrch', v_cat, v_type, 920, 'Kč/m²', false)
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
    select id into v_product from public.products where slug = 'slate-dark';
  end if;

  delete from public.product_images where product_id = v_product;
  delete from public.product_colors where product_id = v_product;

  insert into public.product_images (product_id, url, sort_order)
  values (v_product, 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=700&q=80', 0);

  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#4A4A4A', 0);
  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#2A2A2A', 1);
end $$;


do $$
declare
  v_cat uuid;
  v_type uuid;
  v_product uuid;
begin
  select id into v_cat from public.categories where slug = 'obklady';
  select id into v_type from public.category_types where category_id = v_cat and name = 'Lesklý povrch';

  insert into public.products (slug, name, description, kind, category_id, type_id, price_amount, price_unit, featured)
  values ('calacatta-soft', 'Calacatta Soft', '', 'Obklad · Lesklý povrch', v_cat, v_type, 1380, 'Kč/m²', false)
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
    select id into v_product from public.products where slug = 'calacatta-soft';
  end if;

  delete from public.product_images where product_id = v_product;
  delete from public.product_colors where product_id = v_product;

  insert into public.product_images (product_id, url, sort_order)
  values (v_product, 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=700&q=80', 0);

  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#F7F4EF', 0);
  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#E0D8CE', 1);
end $$;


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


do $$
declare
  v_cat uuid;
  v_type uuid;
  v_product uuid;
begin
  select id into v_cat from public.categories where slug = 'dlazby';
  select id into v_type from public.category_types where category_id = v_cat and name = 'Lesklý povrch';

  insert into public.products (slug, name, description, kind, category_id, type_id, price_amount, price_unit, featured)
  values ('marble-grey', 'Marble Grey', '', 'Dlažba · Lesklý povrch', v_cat, v_type, 1210, 'Kč/m²', false)
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
    select id into v_product from public.products where slug = 'marble-grey';
  end if;

  delete from public.product_images where product_id = v_product;
  delete from public.product_colors where product_id = v_product;

  insert into public.product_images (product_id, url, sort_order)
  values (v_product, 'https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=700&q=80', 0);

  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#D0D0D0', 0);
  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#7E7E7E', 1);
end $$;


do $$
declare
  v_cat uuid;
  v_type uuid;
  v_product uuid;
begin
  select id into v_cat from public.categories where slug = 'venkovni';
  select id into v_type from public.category_types where category_id = v_cat and name = 'Matný povrch';

  insert into public.products (slug, name, description, kind, category_id, type_id, price_amount, price_unit, featured)
  values ('sandstone-warm', 'Sandstone Warm', '', 'Venkovní dlažba · Matný povrch', v_cat, v_type, 1020, 'Kč/m²', false)
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
    select id into v_product from public.products where slug = 'sandstone-warm';
  end if;

  delete from public.product_images where product_id = v_product;
  delete from public.product_colors where product_id = v_product;

  insert into public.product_images (product_id, url, sort_order)
  values (v_product, 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=700&q=80', 0);

  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#D9C3A5', 0);
  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#A68B6A', 1);
end $$;


do $$
declare
  v_cat uuid;
  v_type uuid;
  v_product uuid;
begin
  select id into v_cat from public.categories where slug = 'obklady';
  select id into v_type from public.category_types where category_id = v_cat and name = 'Prosvětlený povrch';

  insert into public.products (slug, name, description, kind, category_id, type_id, price_amount, price_unit, featured)
  values ('onyx-cream', 'Onyx Cream', '', 'Obklad · Prosvětlený povrch', v_cat, v_type, 1460, 'Kč/m²', false)
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
    select id into v_product from public.products where slug = 'onyx-cream';
  end if;

  delete from public.product_images where product_id = v_product;
  delete from public.product_colors where product_id = v_product;

  insert into public.product_images (product_id, url, sort_order)
  values (v_product, 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=700&q=80', 0);

  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#F0E6D4', 0);
  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#C9B29A', 1);
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
  values ('pietra-grey', 'Pietra Grey', '', 'Dlažba · Matný povrch', v_cat, v_type, 1080, 'Kč/m²', false)
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
    select id into v_product from public.products where slug = 'pietra-grey';
  end if;

  delete from public.product_images where product_id = v_product;
  delete from public.product_colors where product_id = v_product;

  insert into public.product_images (product_id, url, sort_order)
  values (v_product, 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=700&q=80', 0);

  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#6E6E6E', 0);
  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#3F3F3F', 1);
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
  values ('microcement-white', 'Microcement White', '', 'Obklad · Matný povrch', v_cat, v_type, 950, 'Kč/m²', false)
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
    select id into v_product from public.products where slug = 'microcement-white';
  end if;

  delete from public.product_images where product_id = v_product;
  delete from public.product_colors where product_id = v_product;

  insert into public.product_images (product_id, url, sort_order)
  values (v_product, 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=700&q=80', 0);

  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#F5F5F5', 0);
  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#C9C9C9', 1);
end $$;


do $$
declare
  v_cat uuid;
  v_type uuid;
  v_product uuid;
begin
  select id into v_cat from public.categories where slug = 'obklady';
  select id into v_type from public.category_types where category_id = v_cat and name = 'Dřevodekor';

  insert into public.products (slug, name, description, kind, category_id, type_id, price_amount, price_unit, featured)
  values ('walnut-line', 'Walnut Line', '', 'Obklad · Dřevodekor', v_cat, v_type, 1130, 'Kč/m²', false)
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
    select id into v_product from public.products where slug = 'walnut-line';
  end if;

  delete from public.product_images where product_id = v_product;
  delete from public.product_colors where product_id = v_product;

  insert into public.product_images (product_id, url, sort_order)
  values (v_product, 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=700&q=80', 0);

  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#8B6B4A', 0);
  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#5C4030', 1);
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
  values ('porcelain-soft', 'Porcelain Soft', '', 'Dlažba · Matný povrch', v_cat, v_type, 790, 'Kč/m²', false)
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
    select id into v_product from public.products where slug = 'porcelain-soft';
  end if;

  delete from public.product_images where product_id = v_product;
  delete from public.product_colors where product_id = v_product;

  insert into public.product_images (product_id, url, sort_order)
  values (v_product, 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdbc?auto=format&fit=crop&w=700&q=80', 0);

  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#E6E1DA', 0);
  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#AFA8A0', 1);
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
  values ('limestone-pale', 'Limestone Pale', '', 'Obklad · Matný povrch', v_cat, v_type, 860, 'Kč/m²', false)
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
    select id into v_product from public.products where slug = 'limestone-pale';
  end if;

  delete from public.product_images where product_id = v_product;
  delete from public.product_colors where product_id = v_product;

  insert into public.product_images (product_id, url, sort_order)
  values (v_product, 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=700&q=80', 0);

  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#E8DFD2', 0);
  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#B7AA98', 1);
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
  values ('nero-marquina', 'Nero Marquina', '', 'Dlažba · Lesklý povrch', v_cat, v_type, 1520, 'Kč/m²', false)
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
    select id into v_product from public.products where slug = 'nero-marquina';
  end if;

  delete from public.product_images where product_id = v_product;
  delete from public.product_colors where product_id = v_product;

  insert into public.product_images (product_id, url, sort_order)
  values (v_product, 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=700&q=80', 0);

  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#2B2B2B', 0);
  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#1F1F1F', 1);
end $$;


do $$
declare
  v_cat uuid;
  v_type uuid;
  v_product uuid;
begin
  select id into v_cat from public.categories where slug = 'venkovni';
  select id into v_type from public.category_types where category_id = v_cat and name = 'Strukturovaný povrch';

  insert into public.products (slug, name, description, kind, category_id, type_id, price_amount, price_unit, featured)
  values ('terrace-basalt', 'Terrace Basalt', '', 'Venkovní dlažba · Strukturovaný povrch', v_cat, v_type, 1120, 'Kč/m²', false)
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
    select id into v_product from public.products where slug = 'terrace-basalt';
  end if;

  delete from public.product_images where product_id = v_product;
  delete from public.product_colors where product_id = v_product;

  insert into public.product_images (product_id, url, sort_order)
  values (v_product, 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=700&q=80', 0);

  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#6A6A6A', 0);
  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#3A3A3A', 1);
end $$;


do $$
declare
  v_cat uuid;
  v_type uuid;
  v_product uuid;
begin
  select id into v_cat from public.categories where slug = 'venkovni';
  select id into v_type from public.category_types where category_id = v_cat and name = 'Matný povrch';

  insert into public.products (slug, name, description, kind, category_id, type_id, price_amount, price_unit, featured)
  values ('outdoor-sand', 'Outdoor Sand', '', 'Venkovní dlažba · Matný povrch', v_cat, v_type, 980, 'Kč/m²', false)
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
    select id into v_product from public.products where slug = 'outdoor-sand';
  end if;

  delete from public.product_images where product_id = v_product;
  delete from public.product_colors where product_id = v_product;

  insert into public.product_images (product_id, url, sort_order)
  values (v_product, 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=700&q=80', 0);

  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#D2C0A8', 0);
  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#9A8268', 1);
end $$;


do $$
declare
  v_cat uuid;
  v_type uuid;
  v_product uuid;
begin
  select id into v_cat from public.categories where slug = 'doplnky';
  select id into v_type from public.category_types where category_id = v_cat and name = 'Profil';

  insert into public.products (slug, name, description, kind, category_id, type_id, price_amount, price_unit, featured)
  values ('hlinikova-lista', 'Hliníková lišta', '', 'Doplněk · Profil', v_cat, v_type, 189, 'Kč/ks', false)
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
    select id into v_product from public.products where slug = 'hlinikova-lista';
  end if;

  delete from public.product_images where product_id = v_product;
  delete from public.product_colors where product_id = v_product;

  insert into public.product_images (product_id, url, sort_order)
  values (v_product, 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=700&q=80', 0);

  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#C0C0C0', 0);
  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#8A8A8A', 1);
end $$;


do $$
declare
  v_cat uuid;
  v_type uuid;
  v_product uuid;
begin
  select id into v_cat from public.categories where slug = 'doplnky';
  select id into v_type from public.category_types where category_id = v_cat and name = 'Profil';

  insert into public.products (slug, name, description, kind, category_id, type_id, price_amount, price_unit, featured)
  values ('dilatacni-profil', 'Dilatační profil', '', 'Doplněk · Profil', v_cat, v_type, 249, 'Kč/ks', false)
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
    select id into v_product from public.products where slug = 'dilatacni-profil';
  end if;

  delete from public.product_images where product_id = v_product;
  delete from public.product_colors where product_id = v_product;

  insert into public.product_images (product_id, url, sort_order)
  values (v_product, 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdbc?auto=format&fit=crop&w=700&q=80', 0);

  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#D6D2CD', 0);
  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#6F6F6F', 1);
end $$;


do $$
declare
  v_cat uuid;
  v_type uuid;
  v_product uuid;
begin
  select id into v_cat from public.categories where slug = 'doplnky';
  select id into v_type from public.category_types where category_id = v_cat and name = 'Sokl';

  insert into public.products (slug, name, description, kind, category_id, type_id, price_amount, price_unit, featured)
  values ('soklova-lista-stone', 'Soklová lišta Stone', '', 'Doplněk · Sokl', v_cat, v_type, 320, 'Kč/m', false)
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
    select id into v_product from public.products where slug = 'soklova-lista-stone';
  end if;

  delete from public.product_images where product_id = v_product;
  delete from public.product_colors where product_id = v_product;

  insert into public.product_images (product_id, url, sort_order)
  values (v_product, 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=700&q=80', 0);

  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#C9B29A', 0);
  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#8A7F72', 1);
end $$;


do $$
declare
  v_cat uuid;
  v_type uuid;
  v_product uuid;
begin
  select id into v_cat from public.categories where slug = 'doplnky';
  select id into v_type from public.category_types where category_id = v_cat and name = 'Spárování';

  insert into public.products (slug, name, description, kind, category_id, type_id, price_amount, price_unit, featured)
  values ('sparovaci-hmota-soft', 'Spárovací hmota Soft', '', 'Doplněk · Spárování', v_cat, v_type, 159, 'Kč/kg', false)
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
    select id into v_product from public.products where slug = 'sparovaci-hmota-soft';
  end if;

  delete from public.product_images where product_id = v_product;
  delete from public.product_colors where product_id = v_product;

  insert into public.product_images (product_id, url, sort_order)
  values (v_product, 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=700&q=80', 0);

  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#F5F1EC', 0);
  insert into public.product_colors (product_id, hex, sort_order) values (v_product, '#D6D2CD', 1);
end $$;
