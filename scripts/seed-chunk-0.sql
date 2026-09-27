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