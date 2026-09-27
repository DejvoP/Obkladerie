import fs from "fs";

const rows = JSON.parse(
  fs.readFileSync("scripts/seed-data.json", "utf8"),
) as {
  slug: string;
  name: string;
  kind: string;
  category: string;
  typeName: string;
  amount: number;
  unit: string;
  featured: boolean;
  image: string;
  colors: string[];
}[];

function esc(s: string) {
  return s.replace(/'/g, "''");
}

const productValues = rows
  .map(
    (p) =>
      `('${esc(p.slug)}', '${esc(p.name)}', '${esc(p.kind)}', '${esc(p.category)}', '${esc(p.typeName)}', ${p.amount}, '${esc(p.unit)}', ${p.featured})`,
  )
  .join(",\n  ");

const imageValues = rows
  .map((p) => `('${esc(p.slug)}', '${esc(p.image)}')`)
  .join(",\n  ");

const colorValues = rows
  .flatMap((p) =>
    p.colors.map(
      (hex, index) => `('${esc(p.slug)}', '${esc(hex)}', ${index})`,
    ),
  )
  .join(",\n  ");

const sql1 = `
with src(slug, name, kind, cat_slug, type_name, amount, unit, featured) as (
  values
  ${productValues}
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
`;

const sql2 = `
with src(slug, image) as (
  values
  ${imageValues}
)
delete from public.product_images pi
using public.products p, src s
where pi.product_id = p.id and p.slug = s.slug;

with src(slug, image) as (
  values
  ${imageValues}
)
insert into public.product_images (product_id, url, sort_order)
select p.id, s.image, 0
from src s
join public.products p on p.slug = s.slug;
`;

const sql3 = `
with src(slug, hex, sort_order) as (
  values
  ${colorValues}
)
delete from public.product_colors pc
using public.products p, src s
where pc.product_id = p.id and p.slug = s.slug;

with src(slug, hex, sort_order) as (
  values
  ${colorValues}
)
insert into public.product_colors (product_id, hex, sort_order)
select p.id, s.hex, s.sort_order
from src s
join public.products p on p.slug = s.slug;

select
  (select count(*) from public.products)::int as products,
  (select count(*) from public.product_images)::int as images,
  (select count(*) from public.product_colors)::int as colors;
`;

fs.writeFileSync("scripts/seed-part1-products.sql", sql1);
fs.writeFileSync("scripts/seed-part2-images.sql", sql2);
fs.writeFileSync("scripts/seed-part3-colors.sql", sql3);
console.log(sql1.length, sql2.length, sql3.length);
