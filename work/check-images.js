const fs = require("fs");
const path = require("path");

const html = fs.readFileSync("index.html", "utf8");
const missing = [];

for (const match of html.matchAll(/<img[^>]+src="([^"]+)"/g)) {
  const src = match[1];
  if (src.includes("+")) continue;
  if (src.startsWith("http")) continue;
  const filePath = path.join(process.cwd(), src.replace(/\//g, path.sep));
  if (!fs.existsSync(filePath)) {
    missing.push(src);
  }
}

if (missing.length) {
  console.error("Missing images:");
  for (const src of missing) console.error(src);
  process.exit(1);
}

console.log("All local img src files exist.");
