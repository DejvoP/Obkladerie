
with src(slug, name, kind, cat_slug, type_name, amount, unit, featured, image, colors) as (
  values
  ('travertin-beige', 'Travertin Beige', 'Obklad · Matný povrch', 'obklady', 'Matný povrch', 890, 'Kč/m²', true, 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=700&q=80', '#C9B29A|#8A7F72'),
  ('marble-white', 'Marble White', 'Dlažba · Lesklý povrch', 'dlazby', 'Lesklý povrch', 1240, 'Kč/m²', true, 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=700&q=80', '#F5F1EC|#D6D2CD'),
  ('concrete-grey', 'Concrete Grey', 'Dlažba · Matný povrch', 'dlazby', 'Matný povrch', 760, 'Kč/m²', true, 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=700&q=80', '#9A9A9A|#6F6F6F'),
  ('stone-sand', 'Stone Sand', 'Obklad · Strukturovaný povrch', 'obklady', 'Strukturovaný povrch', 980, 'Kč/m²', true, 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=700&q=80', '#D4C4B0|#A89078'),
  ('terrazzo-light', 'Terrazzo Light', 'Dlažba · Mramorový efekt', 'dlazby', 'Mramorový efekt', 1150, 'Kč/m²', true, 'https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=700&q=80', '#E8E2DA|#B8A99A'),
  ('oak-fluted', 'Oak Fluted', 'Obklad · Dřevodekor', 'obklady', 'Dřevodekor', 1090, 'Kč/m²', false, 'https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?auto=format&fit=crop&w=700&q=80', '#B8956A|#7A5C3E'),
  ('slate-dark', 'Slate Dark', 'Dlažba · Matný povrch', 'dlazby', 'Matný povrch', 920, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=700&q=80', '#4A4A4A|#2A2A2A'),
  ('calacatta-soft', 'Calacatta Soft', 'Obklad · Lesklý povrch', 'obklady', 'Lesklý povrch', 1380, 'Kč/m²', false, 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=700&q=80', '#F7F4EF|#E0D8CE'),
  ('basalt-graphite', 'Basalt Graphite', 'Venkovní dlažba · Matný povrch', 'venkovni', 'Matný povrch', 1050, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=700&q=80', '#5C5C5C|#3D3D3D'),
  ('lime-wash', 'Lime Wash', 'Obklad · Matný povrch', 'obklady', 'Matný povrch', 840, 'Kč/m²', false, 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=700&q=80', '#EDE6DC|#C2B8AA'),
  ('quartzite-pearl', 'Quartzite Pearl', 'Dlažba · Lesklý povrch', 'dlazby', 'Lesklý povrch', 1290, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdbc?auto=format&fit=crop&w=700&q=80', '#E8E8E8|#B0B0B0'),
  ('terracotta-raw', 'Terracotta Raw', 'Obklad · Matný povrch', 'obklady', 'Matný povrch', 870, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=700&q=80', '#C4785A|#8B4A32'),
  ('granite-ash', 'Granite Ash', 'Dlažba · Strukturovaný povrch', 'dlazby', 'Strukturovaný povrch', 990, 'Kč/m²', false, 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=700&q=80', '#8E8E8E|#5A5A5A'),
  ('ivory-silk', 'Ivory Silk', 'Obklad · Hedvábný povrch', 'obklady', 'Hedvábný povrch', 1180, 'Kč/m²', false, 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=700&q=80', '#F3EDE4|#D2C6B6'),
  ('cement-soft', 'Cement Soft', 'Dlažba · Matný povrch', 'dlazby', 'Matný povrch', 720, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=700&q=80', '#C8C4BE|#8F8A84'),
  ('travertin-noce', 'Travertin Noce', 'Obklad · Matný povrch', 'obklady', 'Matný povrch', 910, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=700&q=80', '#B89A7A|#7A6248'),
  ('marble-grey', 'Marble Grey', 'Dlažba · Lesklý povrch', 'dlazby', 'Lesklý povrch', 1210, 'Kč/m²', false, 'https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=700&q=80', '#D0D0D0|#7E7E7E'),
  ('sandstone-warm', 'Sandstone Warm', 'Venkovní dlažba · Matný povrch', 'venkovni', 'Matný povrch', 1020, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=700&q=80', '#D9C3A5|#A68B6A'),
  ('onyx-cream', 'Onyx Cream', 'Obklad · Prosvětlený povrch', 'obklady', 'Prosvětlený povrch', 1460, 'Kč/m²', false, 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=700&q=80', '#F0E6D4|#C9B29A'),
  ('pietra-grey', 'Pietra Grey', 'Dlažba · Matný povrch', 'dlazby', 'Matný povrch', 1080, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=700&q=80', '#6E6E6E|#3F3F3F'),
  ('microcement-white', 'Microcement White', 'Obklad · Matný povrch', 'obklady', 'Matný povrch', 950, 'Kč/m²', false, 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=700&q=80', '#F5F5F5|#C9C9C9'),
  ('walnut-line', 'Walnut Line', 'Obklad · Dřevodekor', 'obklady', 'Dřevodekor', 1130, 'Kč/m²', false, 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=700&q=80', '#8B6B4A|#5C4030'),
  ('porcelain-soft', 'Porcelain Soft', 'Dlažba · Matný povrch', 'dlazby', 'Matný povrch', 790, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdbc?auto=format&fit=crop&w=700&q=80', '#E6E1DA|#AFA8A0'),
  ('limestone-pale', 'Limestone Pale', 'Obklad · Matný povrch', 'obklady', 'Matný povrch', 860, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=700&q=80', '#E8DFD2|#B7AA98'),
  ('nero-marquina', 'Nero Marquina', 'Dlažba · Lesklý povrch', 'dlazby', 'Lesklý povrch', 1520, 'Kč/m²', false, 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=700&q=80', '#2B2B2B|#1F1F1F'),
  ('terrace-basalt', 'Terrace Basalt', 'Venkovní dlažba · Strukturovaný povrch', 'venkovni', 'Strukturovaný povrch', 1120, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=700&q=80', '#6A6A6A|#3A3A3A'),
  ('outdoor-sand', 'Outdoor Sand', 'Venkovní dlažba · Matný povrch', 'venkovni', 'Matný povrch', 980, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=700&q=80', '#D2C0A8|#9A8268'),
  ('hlinikova-lista', 'Hliníková lišta', 'Doplněk · Profil', 'doplnky', 'Profil', 189, 'Kč/ks', false, 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=700&q=80', '#C0C0C0|#8A8A8A'),
  ('dilatacni-profil', 'Dilatační profil', 'Doplněk · Profil', 'doplnky', 'Profil', 249, 'Kč/ks', false, 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdbc?auto=format&fit=crop&w=700&q=80', '#D6D2CD|#6F6F6F'),
  ('soklova-lista-stone', 'Soklová lišta Stone', 'Doplněk · Sokl', 'doplnky', 'Sokl', 320, 'Kč/m', false, 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=700&q=80', '#C9B29A|#8A7F72'),
  ('sparovaci-hmota-soft', 'Spárovací hmota Soft', 'Doplněk · Spárování', 'doplnky', 'Spárování', 159, 'Kč/kg', false, 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=700&q=80', '#F5F1EC|#D6D2CD')
)
insert into public.products (
  slug, name, description, kind, category_id, type_id, price_amount, price_unit, featured
)
select
  s.slug, s.name, '', s.kind, c.id, t.id, s.amount, s.unit, s.featured
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

with src(slug, name, kind, cat_slug, type_name, amount, unit, featured, image, colors) as (
  values
  ('travertin-beige', 'Travertin Beige', 'Obklad · Matný povrch', 'obklady', 'Matný povrch', 890, 'Kč/m²', true, 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=700&q=80', '#C9B29A|#8A7F72'),
  ('marble-white', 'Marble White', 'Dlažba · Lesklý povrch', 'dlazby', 'Lesklý povrch', 1240, 'Kč/m²', true, 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=700&q=80', '#F5F1EC|#D6D2CD'),
  ('concrete-grey', 'Concrete Grey', 'Dlažba · Matný povrch', 'dlazby', 'Matný povrch', 760, 'Kč/m²', true, 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=700&q=80', '#9A9A9A|#6F6F6F'),
  ('stone-sand', 'Stone Sand', 'Obklad · Strukturovaný povrch', 'obklady', 'Strukturovaný povrch', 980, 'Kč/m²', true, 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=700&q=80', '#D4C4B0|#A89078'),
  ('terrazzo-light', 'Terrazzo Light', 'Dlažba · Mramorový efekt', 'dlazby', 'Mramorový efekt', 1150, 'Kč/m²', true, 'https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=700&q=80', '#E8E2DA|#B8A99A'),
  ('oak-fluted', 'Oak Fluted', 'Obklad · Dřevodekor', 'obklady', 'Dřevodekor', 1090, 'Kč/m²', false, 'https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?auto=format&fit=crop&w=700&q=80', '#B8956A|#7A5C3E'),
  ('slate-dark', 'Slate Dark', 'Dlažba · Matný povrch', 'dlazby', 'Matný povrch', 920, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=700&q=80', '#4A4A4A|#2A2A2A'),
  ('calacatta-soft', 'Calacatta Soft', 'Obklad · Lesklý povrch', 'obklady', 'Lesklý povrch', 1380, 'Kč/m²', false, 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=700&q=80', '#F7F4EF|#E0D8CE'),
  ('basalt-graphite', 'Basalt Graphite', 'Venkovní dlažba · Matný povrch', 'venkovni', 'Matný povrch', 1050, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=700&q=80', '#5C5C5C|#3D3D3D'),
  ('lime-wash', 'Lime Wash', 'Obklad · Matný povrch', 'obklady', 'Matný povrch', 840, 'Kč/m²', false, 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=700&q=80', '#EDE6DC|#C2B8AA'),
  ('quartzite-pearl', 'Quartzite Pearl', 'Dlažba · Lesklý povrch', 'dlazby', 'Lesklý povrch', 1290, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdbc?auto=format&fit=crop&w=700&q=80', '#E8E8E8|#B0B0B0'),
  ('terracotta-raw', 'Terracotta Raw', 'Obklad · Matný povrch', 'obklady', 'Matný povrch', 870, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=700&q=80', '#C4785A|#8B4A32'),
  ('granite-ash', 'Granite Ash', 'Dlažba · Strukturovaný povrch', 'dlazby', 'Strukturovaný povrch', 990, 'Kč/m²', false, 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=700&q=80', '#8E8E8E|#5A5A5A'),
  ('ivory-silk', 'Ivory Silk', 'Obklad · Hedvábný povrch', 'obklady', 'Hedvábný povrch', 1180, 'Kč/m²', false, 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=700&q=80', '#F3EDE4|#D2C6B6'),
  ('cement-soft', 'Cement Soft', 'Dlažba · Matný povrch', 'dlazby', 'Matný povrch', 720, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=700&q=80', '#C8C4BE|#8F8A84'),
  ('travertin-noce', 'Travertin Noce', 'Obklad · Matný povrch', 'obklady', 'Matný povrch', 910, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=700&q=80', '#B89A7A|#7A6248'),
  ('marble-grey', 'Marble Grey', 'Dlažba · Lesklý povrch', 'dlazby', 'Lesklý povrch', 1210, 'Kč/m²', false, 'https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=700&q=80', '#D0D0D0|#7E7E7E'),
  ('sandstone-warm', 'Sandstone Warm', 'Venkovní dlažba · Matný povrch', 'venkovni', 'Matný povrch', 1020, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=700&q=80', '#D9C3A5|#A68B6A'),
  ('onyx-cream', 'Onyx Cream', 'Obklad · Prosvětlený povrch', 'obklady', 'Prosvětlený povrch', 1460, 'Kč/m²', false, 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=700&q=80', '#F0E6D4|#C9B29A'),
  ('pietra-grey', 'Pietra Grey', 'Dlažba · Matný povrch', 'dlazby', 'Matný povrch', 1080, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=700&q=80', '#6E6E6E|#3F3F3F'),
  ('microcement-white', 'Microcement White', 'Obklad · Matný povrch', 'obklady', 'Matný povrch', 950, 'Kč/m²', false, 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=700&q=80', '#F5F5F5|#C9C9C9'),
  ('walnut-line', 'Walnut Line', 'Obklad · Dřevodekor', 'obklady', 'Dřevodekor', 1130, 'Kč/m²', false, 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=700&q=80', '#8B6B4A|#5C4030'),
  ('porcelain-soft', 'Porcelain Soft', 'Dlažba · Matný povrch', 'dlazby', 'Matný povrch', 790, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdbc?auto=format&fit=crop&w=700&q=80', '#E6E1DA|#AFA8A0'),
  ('limestone-pale', 'Limestone Pale', 'Obklad · Matný povrch', 'obklady', 'Matný povrch', 860, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=700&q=80', '#E8DFD2|#B7AA98'),
  ('nero-marquina', 'Nero Marquina', 'Dlažba · Lesklý povrch', 'dlazby', 'Lesklý povrch', 1520, 'Kč/m²', false, 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=700&q=80', '#2B2B2B|#1F1F1F'),
  ('terrace-basalt', 'Terrace Basalt', 'Venkovní dlažba · Strukturovaný povrch', 'venkovni', 'Strukturovaný povrch', 1120, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=700&q=80', '#6A6A6A|#3A3A3A'),
  ('outdoor-sand', 'Outdoor Sand', 'Venkovní dlažba · Matný povrch', 'venkovni', 'Matný povrch', 980, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=700&q=80', '#D2C0A8|#9A8268'),
  ('hlinikova-lista', 'Hliníková lišta', 'Doplněk · Profil', 'doplnky', 'Profil', 189, 'Kč/ks', false, 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=700&q=80', '#C0C0C0|#8A8A8A'),
  ('dilatacni-profil', 'Dilatační profil', 'Doplněk · Profil', 'doplnky', 'Profil', 249, 'Kč/ks', false, 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdbc?auto=format&fit=crop&w=700&q=80', '#D6D2CD|#6F6F6F'),
  ('soklova-lista-stone', 'Soklová lišta Stone', 'Doplněk · Sokl', 'doplnky', 'Sokl', 320, 'Kč/m', false, 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=700&q=80', '#C9B29A|#8A7F72'),
  ('sparovaci-hmota-soft', 'Spárovací hmota Soft', 'Doplněk · Spárování', 'doplnky', 'Spárování', 159, 'Kč/kg', false, 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=700&q=80', '#F5F1EC|#D6D2CD')
)
delete from public.product_images pi
using public.products p, src s
where pi.product_id = p.id and p.slug = s.slug;

with src(slug, name, kind, cat_slug, type_name, amount, unit, featured, image, colors) as (
  values
  ('travertin-beige', 'Travertin Beige', 'Obklad · Matný povrch', 'obklady', 'Matný povrch', 890, 'Kč/m²', true, 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=700&q=80', '#C9B29A|#8A7F72'),
  ('marble-white', 'Marble White', 'Dlažba · Lesklý povrch', 'dlazby', 'Lesklý povrch', 1240, 'Kč/m²', true, 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=700&q=80', '#F5F1EC|#D6D2CD'),
  ('concrete-grey', 'Concrete Grey', 'Dlažba · Matný povrch', 'dlazby', 'Matný povrch', 760, 'Kč/m²', true, 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=700&q=80', '#9A9A9A|#6F6F6F'),
  ('stone-sand', 'Stone Sand', 'Obklad · Strukturovaný povrch', 'obklady', 'Strukturovaný povrch', 980, 'Kč/m²', true, 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=700&q=80', '#D4C4B0|#A89078'),
  ('terrazzo-light', 'Terrazzo Light', 'Dlažba · Mramorový efekt', 'dlazby', 'Mramorový efekt', 1150, 'Kč/m²', true, 'https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=700&q=80', '#E8E2DA|#B8A99A'),
  ('oak-fluted', 'Oak Fluted', 'Obklad · Dřevodekor', 'obklady', 'Dřevodekor', 1090, 'Kč/m²', false, 'https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?auto=format&fit=crop&w=700&q=80', '#B8956A|#7A5C3E'),
  ('slate-dark', 'Slate Dark', 'Dlažba · Matný povrch', 'dlazby', 'Matný povrch', 920, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=700&q=80', '#4A4A4A|#2A2A2A'),
  ('calacatta-soft', 'Calacatta Soft', 'Obklad · Lesklý povrch', 'obklady', 'Lesklý povrch', 1380, 'Kč/m²', false, 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=700&q=80', '#F7F4EF|#E0D8CE'),
  ('basalt-graphite', 'Basalt Graphite', 'Venkovní dlažba · Matný povrch', 'venkovni', 'Matný povrch', 1050, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=700&q=80', '#5C5C5C|#3D3D3D'),
  ('lime-wash', 'Lime Wash', 'Obklad · Matný povrch', 'obklady', 'Matný povrch', 840, 'Kč/m²', false, 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=700&q=80', '#EDE6DC|#C2B8AA'),
  ('quartzite-pearl', 'Quartzite Pearl', 'Dlažba · Lesklý povrch', 'dlazby', 'Lesklý povrch', 1290, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdbc?auto=format&fit=crop&w=700&q=80', '#E8E8E8|#B0B0B0'),
  ('terracotta-raw', 'Terracotta Raw', 'Obklad · Matný povrch', 'obklady', 'Matný povrch', 870, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=700&q=80', '#C4785A|#8B4A32'),
  ('granite-ash', 'Granite Ash', 'Dlažba · Strukturovaný povrch', 'dlazby', 'Strukturovaný povrch', 990, 'Kč/m²', false, 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=700&q=80', '#8E8E8E|#5A5A5A'),
  ('ivory-silk', 'Ivory Silk', 'Obklad · Hedvábný povrch', 'obklady', 'Hedvábný povrch', 1180, 'Kč/m²', false, 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=700&q=80', '#F3EDE4|#D2C6B6'),
  ('cement-soft', 'Cement Soft', 'Dlažba · Matný povrch', 'dlazby', 'Matný povrch', 720, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=700&q=80', '#C8C4BE|#8F8A84'),
  ('travertin-noce', 'Travertin Noce', 'Obklad · Matný povrch', 'obklady', 'Matný povrch', 910, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=700&q=80', '#B89A7A|#7A6248'),
  ('marble-grey', 'Marble Grey', 'Dlažba · Lesklý povrch', 'dlazby', 'Lesklý povrch', 1210, 'Kč/m²', false, 'https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=700&q=80', '#D0D0D0|#7E7E7E'),
  ('sandstone-warm', 'Sandstone Warm', 'Venkovní dlažba · Matný povrch', 'venkovni', 'Matný povrch', 1020, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=700&q=80', '#D9C3A5|#A68B6A'),
  ('onyx-cream', 'Onyx Cream', 'Obklad · Prosvětlený povrch', 'obklady', 'Prosvětlený povrch', 1460, 'Kč/m²', false, 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=700&q=80', '#F0E6D4|#C9B29A'),
  ('pietra-grey', 'Pietra Grey', 'Dlažba · Matný povrch', 'dlazby', 'Matný povrch', 1080, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=700&q=80', '#6E6E6E|#3F3F3F'),
  ('microcement-white', 'Microcement White', 'Obklad · Matný povrch', 'obklady', 'Matný povrch', 950, 'Kč/m²', false, 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=700&q=80', '#F5F5F5|#C9C9C9'),
  ('walnut-line', 'Walnut Line', 'Obklad · Dřevodekor', 'obklady', 'Dřevodekor', 1130, 'Kč/m²', false, 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=700&q=80', '#8B6B4A|#5C4030'),
  ('porcelain-soft', 'Porcelain Soft', 'Dlažba · Matný povrch', 'dlazby', 'Matný povrch', 790, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdbc?auto=format&fit=crop&w=700&q=80', '#E6E1DA|#AFA8A0'),
  ('limestone-pale', 'Limestone Pale', 'Obklad · Matný povrch', 'obklady', 'Matný povrch', 860, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=700&q=80', '#E8DFD2|#B7AA98'),
  ('nero-marquina', 'Nero Marquina', 'Dlažba · Lesklý povrch', 'dlazby', 'Lesklý povrch', 1520, 'Kč/m²', false, 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=700&q=80', '#2B2B2B|#1F1F1F'),
  ('terrace-basalt', 'Terrace Basalt', 'Venkovní dlažba · Strukturovaný povrch', 'venkovni', 'Strukturovaný povrch', 1120, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=700&q=80', '#6A6A6A|#3A3A3A'),
  ('outdoor-sand', 'Outdoor Sand', 'Venkovní dlažba · Matný povrch', 'venkovni', 'Matný povrch', 980, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=700&q=80', '#D2C0A8|#9A8268'),
  ('hlinikova-lista', 'Hliníková lišta', 'Doplněk · Profil', 'doplnky', 'Profil', 189, 'Kč/ks', false, 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=700&q=80', '#C0C0C0|#8A8A8A'),
  ('dilatacni-profil', 'Dilatační profil', 'Doplněk · Profil', 'doplnky', 'Profil', 249, 'Kč/ks', false, 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdbc?auto=format&fit=crop&w=700&q=80', '#D6D2CD|#6F6F6F'),
  ('soklova-lista-stone', 'Soklová lišta Stone', 'Doplněk · Sokl', 'doplnky', 'Sokl', 320, 'Kč/m', false, 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=700&q=80', '#C9B29A|#8A7F72'),
  ('sparovaci-hmota-soft', 'Spárovací hmota Soft', 'Doplněk · Spárování', 'doplnky', 'Spárování', 159, 'Kč/kg', false, 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=700&q=80', '#F5F1EC|#D6D2CD')
)
delete from public.product_colors pc
using public.products p, src s
where pc.product_id = p.id and p.slug = s.slug;

with src(slug, name, kind, cat_slug, type_name, amount, unit, featured, image, colors) as (
  values
  ('travertin-beige', 'Travertin Beige', 'Obklad · Matný povrch', 'obklady', 'Matný povrch', 890, 'Kč/m²', true, 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=700&q=80', '#C9B29A|#8A7F72'),
  ('marble-white', 'Marble White', 'Dlažba · Lesklý povrch', 'dlazby', 'Lesklý povrch', 1240, 'Kč/m²', true, 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=700&q=80', '#F5F1EC|#D6D2CD'),
  ('concrete-grey', 'Concrete Grey', 'Dlažba · Matný povrch', 'dlazby', 'Matný povrch', 760, 'Kč/m²', true, 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=700&q=80', '#9A9A9A|#6F6F6F'),
  ('stone-sand', 'Stone Sand', 'Obklad · Strukturovaný povrch', 'obklady', 'Strukturovaný povrch', 980, 'Kč/m²', true, 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=700&q=80', '#D4C4B0|#A89078'),
  ('terrazzo-light', 'Terrazzo Light', 'Dlažba · Mramorový efekt', 'dlazby', 'Mramorový efekt', 1150, 'Kč/m²', true, 'https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=700&q=80', '#E8E2DA|#B8A99A'),
  ('oak-fluted', 'Oak Fluted', 'Obklad · Dřevodekor', 'obklady', 'Dřevodekor', 1090, 'Kč/m²', false, 'https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?auto=format&fit=crop&w=700&q=80', '#B8956A|#7A5C3E'),
  ('slate-dark', 'Slate Dark', 'Dlažba · Matný povrch', 'dlazby', 'Matný povrch', 920, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=700&q=80', '#4A4A4A|#2A2A2A'),
  ('calacatta-soft', 'Calacatta Soft', 'Obklad · Lesklý povrch', 'obklady', 'Lesklý povrch', 1380, 'Kč/m²', false, 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=700&q=80', '#F7F4EF|#E0D8CE'),
  ('basalt-graphite', 'Basalt Graphite', 'Venkovní dlažba · Matný povrch', 'venkovni', 'Matný povrch', 1050, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=700&q=80', '#5C5C5C|#3D3D3D'),
  ('lime-wash', 'Lime Wash', 'Obklad · Matný povrch', 'obklady', 'Matný povrch', 840, 'Kč/m²', false, 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=700&q=80', '#EDE6DC|#C2B8AA'),
  ('quartzite-pearl', 'Quartzite Pearl', 'Dlažba · Lesklý povrch', 'dlazby', 'Lesklý povrch', 1290, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdbc?auto=format&fit=crop&w=700&q=80', '#E8E8E8|#B0B0B0'),
  ('terracotta-raw', 'Terracotta Raw', 'Obklad · Matný povrch', 'obklady', 'Matný povrch', 870, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=700&q=80', '#C4785A|#8B4A32'),
  ('granite-ash', 'Granite Ash', 'Dlažba · Strukturovaný povrch', 'dlazby', 'Strukturovaný povrch', 990, 'Kč/m²', false, 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=700&q=80', '#8E8E8E|#5A5A5A'),
  ('ivory-silk', 'Ivory Silk', 'Obklad · Hedvábný povrch', 'obklady', 'Hedvábný povrch', 1180, 'Kč/m²', false, 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=700&q=80', '#F3EDE4|#D2C6B6'),
  ('cement-soft', 'Cement Soft', 'Dlažba · Matný povrch', 'dlazby', 'Matný povrch', 720, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=700&q=80', '#C8C4BE|#8F8A84'),
  ('travertin-noce', 'Travertin Noce', 'Obklad · Matný povrch', 'obklady', 'Matný povrch', 910, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=700&q=80', '#B89A7A|#7A6248'),
  ('marble-grey', 'Marble Grey', 'Dlažba · Lesklý povrch', 'dlazby', 'Lesklý povrch', 1210, 'Kč/m²', false, 'https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=700&q=80', '#D0D0D0|#7E7E7E'),
  ('sandstone-warm', 'Sandstone Warm', 'Venkovní dlažba · Matný povrch', 'venkovni', 'Matný povrch', 1020, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=700&q=80', '#D9C3A5|#A68B6A'),
  ('onyx-cream', 'Onyx Cream', 'Obklad · Prosvětlený povrch', 'obklady', 'Prosvětlený povrch', 1460, 'Kč/m²', false, 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=700&q=80', '#F0E6D4|#C9B29A'),
  ('pietra-grey', 'Pietra Grey', 'Dlažba · Matný povrch', 'dlazby', 'Matný povrch', 1080, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=700&q=80', '#6E6E6E|#3F3F3F'),
  ('microcement-white', 'Microcement White', 'Obklad · Matný povrch', 'obklady', 'Matný povrch', 950, 'Kč/m²', false, 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=700&q=80', '#F5F5F5|#C9C9C9'),
  ('walnut-line', 'Walnut Line', 'Obklad · Dřevodekor', 'obklady', 'Dřevodekor', 1130, 'Kč/m²', false, 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=700&q=80', '#8B6B4A|#5C4030'),
  ('porcelain-soft', 'Porcelain Soft', 'Dlažba · Matný povrch', 'dlazby', 'Matný povrch', 790, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdbc?auto=format&fit=crop&w=700&q=80', '#E6E1DA|#AFA8A0'),
  ('limestone-pale', 'Limestone Pale', 'Obklad · Matný povrch', 'obklady', 'Matný povrch', 860, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=700&q=80', '#E8DFD2|#B7AA98'),
  ('nero-marquina', 'Nero Marquina', 'Dlažba · Lesklý povrch', 'dlazby', 'Lesklý povrch', 1520, 'Kč/m²', false, 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=700&q=80', '#2B2B2B|#1F1F1F'),
  ('terrace-basalt', 'Terrace Basalt', 'Venkovní dlažba · Strukturovaný povrch', 'venkovni', 'Strukturovaný povrch', 1120, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=700&q=80', '#6A6A6A|#3A3A3A'),
  ('outdoor-sand', 'Outdoor Sand', 'Venkovní dlažba · Matný povrch', 'venkovni', 'Matný povrch', 980, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=700&q=80', '#D2C0A8|#9A8268'),
  ('hlinikova-lista', 'Hliníková lišta', 'Doplněk · Profil', 'doplnky', 'Profil', 189, 'Kč/ks', false, 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=700&q=80', '#C0C0C0|#8A8A8A'),
  ('dilatacni-profil', 'Dilatační profil', 'Doplněk · Profil', 'doplnky', 'Profil', 249, 'Kč/ks', false, 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdbc?auto=format&fit=crop&w=700&q=80', '#D6D2CD|#6F6F6F'),
  ('soklova-lista-stone', 'Soklová lišta Stone', 'Doplněk · Sokl', 'doplnky', 'Sokl', 320, 'Kč/m', false, 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=700&q=80', '#C9B29A|#8A7F72'),
  ('sparovaci-hmota-soft', 'Spárovací hmota Soft', 'Doplněk · Spárování', 'doplnky', 'Spárování', 159, 'Kč/kg', false, 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=700&q=80', '#F5F1EC|#D6D2CD')
)
insert into public.product_images (product_id, url, sort_order)
select p.id, s.image, 0
from src s
join public.products p on p.slug = s.slug;

with src(slug, name, kind, cat_slug, type_name, amount, unit, featured, image, colors) as (
  values
  ('travertin-beige', 'Travertin Beige', 'Obklad · Matný povrch', 'obklady', 'Matný povrch', 890, 'Kč/m²', true, 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=700&q=80', '#C9B29A|#8A7F72'),
  ('marble-white', 'Marble White', 'Dlažba · Lesklý povrch', 'dlazby', 'Lesklý povrch', 1240, 'Kč/m²', true, 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=700&q=80', '#F5F1EC|#D6D2CD'),
  ('concrete-grey', 'Concrete Grey', 'Dlažba · Matný povrch', 'dlazby', 'Matný povrch', 760, 'Kč/m²', true, 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=700&q=80', '#9A9A9A|#6F6F6F'),
  ('stone-sand', 'Stone Sand', 'Obklad · Strukturovaný povrch', 'obklady', 'Strukturovaný povrch', 980, 'Kč/m²', true, 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=700&q=80', '#D4C4B0|#A89078'),
  ('terrazzo-light', 'Terrazzo Light', 'Dlažba · Mramorový efekt', 'dlazby', 'Mramorový efekt', 1150, 'Kč/m²', true, 'https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=700&q=80', '#E8E2DA|#B8A99A'),
  ('oak-fluted', 'Oak Fluted', 'Obklad · Dřevodekor', 'obklady', 'Dřevodekor', 1090, 'Kč/m²', false, 'https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?auto=format&fit=crop&w=700&q=80', '#B8956A|#7A5C3E'),
  ('slate-dark', 'Slate Dark', 'Dlažba · Matný povrch', 'dlazby', 'Matný povrch', 920, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=700&q=80', '#4A4A4A|#2A2A2A'),
  ('calacatta-soft', 'Calacatta Soft', 'Obklad · Lesklý povrch', 'obklady', 'Lesklý povrch', 1380, 'Kč/m²', false, 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=700&q=80', '#F7F4EF|#E0D8CE'),
  ('basalt-graphite', 'Basalt Graphite', 'Venkovní dlažba · Matný povrch', 'venkovni', 'Matný povrch', 1050, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=700&q=80', '#5C5C5C|#3D3D3D'),
  ('lime-wash', 'Lime Wash', 'Obklad · Matný povrch', 'obklady', 'Matný povrch', 840, 'Kč/m²', false, 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=700&q=80', '#EDE6DC|#C2B8AA'),
  ('quartzite-pearl', 'Quartzite Pearl', 'Dlažba · Lesklý povrch', 'dlazby', 'Lesklý povrch', 1290, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdbc?auto=format&fit=crop&w=700&q=80', '#E8E8E8|#B0B0B0'),
  ('terracotta-raw', 'Terracotta Raw', 'Obklad · Matný povrch', 'obklady', 'Matný povrch', 870, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=700&q=80', '#C4785A|#8B4A32'),
  ('granite-ash', 'Granite Ash', 'Dlažba · Strukturovaný povrch', 'dlazby', 'Strukturovaný povrch', 990, 'Kč/m²', false, 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=700&q=80', '#8E8E8E|#5A5A5A'),
  ('ivory-silk', 'Ivory Silk', 'Obklad · Hedvábný povrch', 'obklady', 'Hedvábný povrch', 1180, 'Kč/m²', false, 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=700&q=80', '#F3EDE4|#D2C6B6'),
  ('cement-soft', 'Cement Soft', 'Dlažba · Matný povrch', 'dlazby', 'Matný povrch', 720, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=700&q=80', '#C8C4BE|#8F8A84'),
  ('travertin-noce', 'Travertin Noce', 'Obklad · Matný povrch', 'obklady', 'Matný povrch', 910, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=700&q=80', '#B89A7A|#7A6248'),
  ('marble-grey', 'Marble Grey', 'Dlažba · Lesklý povrch', 'dlazby', 'Lesklý povrch', 1210, 'Kč/m²', false, 'https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=700&q=80', '#D0D0D0|#7E7E7E'),
  ('sandstone-warm', 'Sandstone Warm', 'Venkovní dlažba · Matný povrch', 'venkovni', 'Matný povrch', 1020, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=700&q=80', '#D9C3A5|#A68B6A'),
  ('onyx-cream', 'Onyx Cream', 'Obklad · Prosvětlený povrch', 'obklady', 'Prosvětlený povrch', 1460, 'Kč/m²', false, 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=700&q=80', '#F0E6D4|#C9B29A'),
  ('pietra-grey', 'Pietra Grey', 'Dlažba · Matný povrch', 'dlazby', 'Matný povrch', 1080, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=700&q=80', '#6E6E6E|#3F3F3F'),
  ('microcement-white', 'Microcement White', 'Obklad · Matný povrch', 'obklady', 'Matný povrch', 950, 'Kč/m²', false, 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=700&q=80', '#F5F5F5|#C9C9C9'),
  ('walnut-line', 'Walnut Line', 'Obklad · Dřevodekor', 'obklady', 'Dřevodekor', 1130, 'Kč/m²', false, 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=700&q=80', '#8B6B4A|#5C4030'),
  ('porcelain-soft', 'Porcelain Soft', 'Dlažba · Matný povrch', 'dlazby', 'Matný povrch', 790, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdbc?auto=format&fit=crop&w=700&q=80', '#E6E1DA|#AFA8A0'),
  ('limestone-pale', 'Limestone Pale', 'Obklad · Matný povrch', 'obklady', 'Matný povrch', 860, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=700&q=80', '#E8DFD2|#B7AA98'),
  ('nero-marquina', 'Nero Marquina', 'Dlažba · Lesklý povrch', 'dlazby', 'Lesklý povrch', 1520, 'Kč/m²', false, 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=700&q=80', '#2B2B2B|#1F1F1F'),
  ('terrace-basalt', 'Terrace Basalt', 'Venkovní dlažba · Strukturovaný povrch', 'venkovni', 'Strukturovaný povrch', 1120, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=700&q=80', '#6A6A6A|#3A3A3A'),
  ('outdoor-sand', 'Outdoor Sand', 'Venkovní dlažba · Matný povrch', 'venkovni', 'Matný povrch', 980, 'Kč/m²', false, 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=700&q=80', '#D2C0A8|#9A8268'),
  ('hlinikova-lista', 'Hliníková lišta', 'Doplněk · Profil', 'doplnky', 'Profil', 189, 'Kč/ks', false, 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=700&q=80', '#C0C0C0|#8A8A8A'),
  ('dilatacni-profil', 'Dilatační profil', 'Doplněk · Profil', 'doplnky', 'Profil', 249, 'Kč/ks', false, 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdbc?auto=format&fit=crop&w=700&q=80', '#D6D2CD|#6F6F6F'),
  ('soklova-lista-stone', 'Soklová lišta Stone', 'Doplněk · Sokl', 'doplnky', 'Sokl', 320, 'Kč/m', false, 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=700&q=80', '#C9B29A|#8A7F72'),
  ('sparovaci-hmota-soft', 'Spárovací hmota Soft', 'Doplněk · Spárování', 'doplnky', 'Spárování', 159, 'Kč/kg', false, 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=700&q=80', '#F5F1EC|#D6D2CD')
)
insert into public.product_colors (product_id, hex, sort_order)
select p.id, color.hex, (color.ord - 1)::int
from src s
join public.products p on p.slug = s.slug
cross join lateral unnest(string_to_array(s.colors, '|')) with ordinality as color(hex, ord);

select
  (select count(*) from public.products)::int as products,
  (select count(*) from public.product_images)::int as images,
  (select count(*) from public.product_colors)::int as colors;
