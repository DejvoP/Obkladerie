import fs from "fs";

async function main() {
  // Dynamic import of agent isn't available; just ensure files load
  for (const i of [0, 1, 2, 3]) {
    const { query } = JSON.parse(
      fs.readFileSync(`scripts/mcp-query-${i}.json`, "utf8"),
    ) as { query: string };
    console.log(`CHUNK ${i} len=${query.length}`);
  }
}

main();
