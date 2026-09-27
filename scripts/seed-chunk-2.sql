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