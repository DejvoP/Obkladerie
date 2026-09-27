
with src(slug, image) as (
  values
  ('travertin-beige', 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=700&q=80'),
  ('marble-white', 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=700&q=80'),
  ('concrete-grey', 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=700&q=80'),
  ('stone-sand', 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=700&q=80'),
  ('terrazzo-light', 'https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=700&q=80'),
  ('oak-fluted', 'https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?auto=format&fit=crop&w=700&q=80'),
  ('slate-dark', 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=700&q=80'),
  ('calacatta-soft', 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=700&q=80'),
  ('basalt-graphite', 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=700&q=80'),
  ('lime-wash', 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=700&q=80'),
  ('quartzite-pearl', 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdbc?auto=format&fit=crop&w=700&q=80'),
  ('terracotta-raw', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=700&q=80'),
  ('granite-ash', 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=700&q=80'),
  ('ivory-silk', 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=700&q=80'),
  ('cement-soft', 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=700&q=80'),
  ('travertin-noce', 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=700&q=80'),
  ('marble-grey', 'https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=700&q=80'),
  ('sandstone-warm', 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=700&q=80'),
  ('onyx-cream', 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=700&q=80'),
  ('pietra-grey', 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=700&q=80'),
  ('microcement-white', 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=700&q=80'),
  ('walnut-line', 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=700&q=80'),
  ('porcelain-soft', 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdbc?auto=format&fit=crop&w=700&q=80'),
  ('limestone-pale', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=700&q=80'),
  ('nero-marquina', 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=700&q=80'),
  ('terrace-basalt', 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=700&q=80'),
  ('outdoor-sand', 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=700&q=80'),
  ('hlinikova-lista', 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=700&q=80'),
  ('dilatacni-profil', 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdbc?auto=format&fit=crop&w=700&q=80'),
  ('soklova-lista-stone', 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=700&q=80'),
  ('sparovaci-hmota-soft', 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=700&q=80')
)
delete from public.product_images pi
using public.products p, src s
where pi.product_id = p.id and p.slug = s.slug;

with src(slug, image) as (
  values
  ('travertin-beige', 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=700&q=80'),
  ('marble-white', 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=700&q=80'),
  ('concrete-grey', 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=700&q=80'),
  ('stone-sand', 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=700&q=80'),
  ('terrazzo-light', 'https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=700&q=80'),
  ('oak-fluted', 'https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?auto=format&fit=crop&w=700&q=80'),
  ('slate-dark', 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=700&q=80'),
  ('calacatta-soft', 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=700&q=80'),
  ('basalt-graphite', 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=700&q=80'),
  ('lime-wash', 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=700&q=80'),
  ('quartzite-pearl', 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdbc?auto=format&fit=crop&w=700&q=80'),
  ('terracotta-raw', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=700&q=80'),
  ('granite-ash', 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=700&q=80'),
  ('ivory-silk', 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=700&q=80'),
  ('cement-soft', 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=700&q=80'),
  ('travertin-noce', 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=700&q=80'),
  ('marble-grey', 'https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=700&q=80'),
  ('sandstone-warm', 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=700&q=80'),
  ('onyx-cream', 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=700&q=80'),
  ('pietra-grey', 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=700&q=80'),
  ('microcement-white', 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=700&q=80'),
  ('walnut-line', 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=700&q=80'),
  ('porcelain-soft', 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdbc?auto=format&fit=crop&w=700&q=80'),
  ('limestone-pale', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=700&q=80'),
  ('nero-marquina', 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=700&q=80'),
  ('terrace-basalt', 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=700&q=80'),
  ('outdoor-sand', 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=700&q=80'),
  ('hlinikova-lista', 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=700&q=80'),
  ('dilatacni-profil', 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdbc?auto=format&fit=crop&w=700&q=80'),
  ('soklova-lista-stone', 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=700&q=80'),
  ('sparovaci-hmota-soft', 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=700&q=80')
)
insert into public.product_images (product_id, url, sort_order)
select p.id, s.image, 0
from src s
join public.products p on p.slug = s.slug;
