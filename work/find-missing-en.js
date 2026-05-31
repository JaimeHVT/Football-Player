const fs = require("fs");

const source = fs.readFileSync("index.html", "utf8");
const lines = source.split(/\r?\n/);

for (let i = 0; i < lines.length; i++) {
  if (!lines[i].includes('idioma === "pt-Br"')) continue;
  const chunk = lines.slice(i, Math.min(lines.length, i + 22)).join("\n");
  if (chunk.includes('idioma === "cat"') && !chunk.includes('idioma === "en"')) {
    console.log(`${i + 1}: ${lines[i].trim()}`);
  }
}
