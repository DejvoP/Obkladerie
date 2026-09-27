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

const parts: string[] = [];

for (const p of rows) {
  parts.push(`
do $$
declare
  v_cat uuid;
  v_type uuid;
  v_product uuid;
begin
  select id into v_cat from public.categories where slug = '${esc(p.category)}';
  select id into v_type from public.category_types where category_id = v_cat and name = '${esc(p.typeName)}';

  insert into public.products (slug, name, description, kind, category_id, type_id, price_amount, price_unit, featured)
  values ('${esc(p.slug)}', '${esc(p.name)}', '', '${esc(p.kind)}', v_cat, v_type, ${p.amount}, '${esc(p.unit)}', ${p.featured})
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
    select id into v_product from public.products where slug = '${esc(p.slug)}';
  end if;

  delete from public.product_images where product_id = v_product;
  delete from public.product_colors where product_id = v_product;

  insert into public.product_images (product_id, url, sort_order)
  values (v_product, '${esc(p.image)}', 0);

  ${p.colors
    .map(
      (hex, index) =>
        `insert into public.product_colors (product_id, hex, sort_order) values (v_product, '${esc(hex)}', ${index});`,
    )
    .join("\n  ")}
end $$;
`);
}

fs.writeFileSync("scripts/seed-products.sql", parts.join("\n"));
console.log(`Wrote ${rows.length} product blocks`);
