
with src(slug, name, kind, cat_slug, type_name, amount, unit, featured) as (
  values
  ('travertin-beige', 'Travertin Beige', 'Obklad · Matný povrch', 'obklady', 'Matný povrch', 890, 'Kč/m²', true),
  ('marble-white', 'Marble White', 'Dlažba · Lesklý povrch', 'dlazby', 'Lesklý povrch', 1240, 'Kč/m²', true),
  ('concrete-grey', 'Concrete Grey', 'Dlažba · Matný povrch', 'dlazby', 'Matný povrch', 760, 'Kč/m²', true),
  ('stone-sand', 'Stone Sand', 'Obklad · Strukturovaný povrch', 'obklady', 'Strukturovaný povrch', 980, 'Kč/m²', true),
  ('terrazzo-light', 'Terrazzo Light', 'Dlažba · Mramorový efekt', 'dlazby', 'Mramorový efekt', 1150, 'Kč/m²', true),
  ('oak-fluted', 'Oak Fluted', 'Obklad · Dřevodekor', 'obklady', 'Dřevodekor', 1090, 'Kč/m²', false),
  ('slate-dark', 'Slate Dark', 'Dlažba · Matný povrch', 'dlazby', 'Matný povrch', 920, 'Kč/m²', false),
  ('calacatta-soft', 'Calacatta Soft', 'Obklad · Lesklý povrch', 'obklady', 'Lesklý povrch', 1380, 'Kč/m²', false),
  ('basalt-graphite', 'Basalt Graphite', 'Venkovní dlažba · Matný povrch', 'venkovni', 'Matný povrch', 1050, 'Kč/m²', false),
  ('lime-wash', 'Lime Wash', 'Obklad · Matný povrch', 'obklady', 'Matný povrch', 840, 'Kč/m²', false),
  ('quartzite-pearl', 'Quartzite Pearl', 'Dlažba · Lesklý povrch', 'dlazby', 'Lesklý povrch', 1290, 'Kč/m²', false),
  ('terracotta-raw', 'Terracotta Raw', 'Obklad · Matný povrch', 'obklady', 'Matný povrch', 870, 'Kč/m²', false),
  ('granite-ash', 'Granite Ash', 'Dlažba · Strukturovaný povrch', 'dlazby', 'Strukturovaný povrch', 990, 'Kč/m²', false),
  ('ivory-silk', 'Ivory Silk', 'Obklad · Hedvábný povrch', 'obklady', 'Hedvábný povrch', 1180, 'Kč/m²', false),
  ('cement-soft', 'Cement Soft', 'Dlažba · Matný povrch', 'dlazby', 'Matný povrch', 720, 'Kč/m²', false),
  ('travertin-noce', 'Travertin Noce', 'Obklad · Matný povrch', 'obklady', 'Matný povrch', 910, 'Kč/m²', false),
  ('marble-grey', 'Marble Grey', 'Dlažba · Lesklý povrch', 'dlazby', 'Lesklý povrch', 1210, 'Kč/m²', false),
  ('sandstone-warm', 'Sandstone Warm', 'Venkovní dlažba · Matný povrch', 'venkovni', 'Matný povrch', 1020, 'Kč/m²', false),
  ('onyx-cream', 'Onyx Cream', 'Obklad · Prosvětlený povrch', 'obklady', 'Prosvětlený povrch', 1460, 'Kč/m²', false),
  ('pietra-grey', 'Pietra Grey', 'Dlažba · Matný povrch', 'dlazby', 'Matný povrch', 1080, 'Kč/m²', false),
  ('microcement-white', 'Microcement White', 'Obklad · Matný povrch', 'obklady', 'Matný povrch', 950, 'Kč/m²', false),
  ('walnut-line', 'Walnut Line', 'Obklad · Dřevodekor', 'obklady', 'Dřevodekor', 1130, 'Kč/m²', false),
  ('porcelain-soft', 'Porcelain Soft', 'Dlažba · Matný povrch', 'dlazby', 'Matný povrch', 790, 'Kč/m²', false),
  ('limestone-pale', 'Limestone Pale', 'Obklad · Matný povrch', 'obklady', 'Matný povrch', 860, 'Kč/m²', false),
  ('nero-marquina', 'Nero Marquina', 'Dlažba · Lesklý povrch', 'dlazby', 'Lesklý povrch', 1520, 'Kč/m²', false),
  ('terrace-basalt', 'Terrace Basalt', 'Venkovní dlažba · Strukturovaný povrch', 'venkovni', 'Strukturovaný povrch', 1120, 'Kč/m²', false),
  ('outdoor-sand', 'Outdoor Sand', 'Venkovní dlažba · Matný povrch', 'venkovni', 'Matný povrch', 980, 'Kč/m²', false),
  ('hlinikova-lista', 'Hliníková lišta', 'Doplněk · Profil', 'doplnky', 'Profil', 189, 'Kč/ks', false),
  ('dilatacni-profil', 'Dilatační profil', 'Doplněk · Profil', 'doplnky', 'Profil', 249, 'Kč/ks', false),
  ('soklova-lista-stone', 'Soklová lišta Stone', 'Doplněk · Sokl', 'doplnky', 'Sokl', 320, 'Kč/m', false),
  ('sparovaci-hmota-soft', 'Spárovací hmota Soft', 'Doplněk · Spárování', 'doplnky', 'Spárování', 159, 'Kč/kg', false)
)
insert into public.products (
  slug, name, description, kind, category_id, type_id, price_amount, price_unit, featured
)
select s.slug, s.name, '', s.kind, c.id, t.id, s.amount, s.unit, s.featured
from src s
join public.categories c on c.slug = s.cat_slug
left join public.category_types t on t.category_id = c.id and t.name = s.type_name
on conflict (slug) do update set
  name = excluded.name,
  kind = excluded.kind,
  category_id = excluded.category_id,
  type_id = excluded.type_id,
  price_amount = excluded.price_amount,
  price_unit = excluded.price_unit,
  featured = excluded.featured;
