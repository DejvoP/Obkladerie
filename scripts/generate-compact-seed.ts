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

const valueRows = rows
  .map(
    (p) =>
      `('${esc(p.slug)}', '${esc(p.name)}', '${esc(p.kind)}', '${esc(p.category)}', '${esc(p.typeName)}', ${p.amount}, '${esc(p.unit)}', ${p.featured}, '${esc(p.image)}', '${esc(p.colors.join("|"))}')`,
  )
  .join(",\n  ");

const srcCte = `src(slug, name, kind, cat_slug, type_name, amount, unit, featured, image, colors) as (
  values
  ${valueRows}
)`;

const sql = `
with ${srcCte}
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

with ${srcCte}
delete from public.product_images pi
using public.products p, src s
where pi.product_id = p.id and p.slug = s.slug;

with ${srcCte}
delete from public.product_colors pc
using public.products p, src s
where pc.product_id = p.id and p.slug = s.slug;

with ${srcCte}
insert into public.product_images (product_id, url, sort_order)
select p.id, s.image, 0
from src s
join public.products p on p.slug = s.slug;

with ${srcCte}
insert into public.product_colors (product_id, hex, sort_order)
select p.id, color.hex, (color.ord - 1)::int
from src s
join public.products p on p.slug = s.slug
cross join lateral unnest(string_to_array(s.colors, '|')) with ordinality as color(hex, ord);

select
  (select count(*) from public.products)::int as products,
  (select count(*) from public.product_images)::int as images,
  (select count(*) from public.product_colors)::int as colors;
`;

fs.writeFileSync("scripts/seed-compact.sql", sql);
console.log("wrote", sql.length, "chars");
