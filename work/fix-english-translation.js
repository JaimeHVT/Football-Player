const fs = require("fs");
const path = require("path");

const file = path.resolve(__dirname, "..", "index.html");
let source = fs.readFileSync(file, "utf8");

const functionStart = source.indexOf("function mudarIdioma");
if (functionStart === -1) throw new Error("Language function not found.");

const enMarker = '} else if (idioma === "en")';
const enStart = source.indexOf(enMarker, functionStart);
if (enStart === -1) throw new Error("English language block not found.");

const nextCall = source.indexOf("gerarNoticia();", enStart);
if (nextCall === -1) throw new Error("End of language function not found.");

const before = source.slice(0, enStart);
let englishBlock = source.slice(enStart, nextCall);
const after = source.slice(nextCall);

englishBlock = englishBlock.replace(
  /document\.getElementById\("LT103"\)\.textContent = ".*?";/,
  'document.getElementById("LT103").textContent = "Great pass from the back! The striker is through on goal and doesn\'t miss!";',
);

source = before + englishBlock + after;
fs.writeFileSync(file, source, "utf8");
