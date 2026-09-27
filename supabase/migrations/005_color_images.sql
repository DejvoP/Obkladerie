-- Link color variants to product images
alter table public.product_colors
  add column if not exists image_url text;

update public.product_colors pc
set image_url = pi.url
from public.product_images pi
where pi.product_id = pc.product_id
  and pi.sort_order = pc.sort_order
  and pc.image_url is null;
