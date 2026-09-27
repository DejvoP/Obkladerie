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