import fs from "fs";

const sql = fs.readFileSync("scripts/seed-products.sql", "utf8");
const blocks = sql
  .split(/(?=do \$\$)/)
  .map((b) => b.trim())
  .filter(Boolean);

console.log("blocks", blocks.length);

const size = 8;
for (let i = 0; i < blocks.length; i += size) {
  const index = Math.floor(i / size);
  const chunk = blocks.slice(i, i + size).join("\n\n");
  fs.writeFileSync(`scripts/seed-chunk-${index}.sql`, chunk);
  console.log("chunk", index, chunk.length);
}
