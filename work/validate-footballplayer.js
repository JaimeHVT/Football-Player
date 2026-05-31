const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");

const requiredFlags = ["flag-brazil.svg", "flag-catalonia.svg", "flag-english.svg"];
for (const flag of requiredFlags) {
  const flagPath = path.join(root, "img", flag);
  if (!fs.existsSync(flagPath)) throw new Error(`Missing ${flag}`);
}

if (/wikipedia|wikimedia/i.test(html)) {
  throw new Error("Found external Wikipedia/Wikimedia image reference.");
}

const initialLanguageBlock = html.slice(html.indexOf('id="D85"'), html.indexOf('id="D63"'));
const menuLanguageBlock = html.slice(html.indexOf('id="D84"'), html.indexOf('id="D87"'));
for (const lang of ["pt-Br", "cat", "en"]) {
  if (!initialLanguageBlock.includes(`mudarIdioma('${lang}')`)) {
    throw new Error(`Initial language screen is missing ${lang}.`);
  }
  if (!menuLanguageBlock.includes(`mudarIdioma('${lang}')`)) {
    throw new Error(`Change-language screen is missing ${lang}.`);
  }
}

const scriptBlocks = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)].map((match) => match[1]);
scriptBlocks.forEach((script, index) => {
  new Function(script);
});

console.log(`Validated ${requiredFlags.length} local flags, ${scriptBlocks.length} script blocks, and 3 language options.`);
