const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const source = fs.readFileSync(path.join(root, "index.html"), "utf8");
const start = source.indexOf("function mudarIdioma");
const end = source.indexOf("gerarNoticia();", start);
const fn = source.slice(start, end);

const markers = {
  "pt-Br": 'if (idioma === "pt-Br")',
  cat: '} else if (idioma === "cat")',
  en: '} else if (idioma === "en")',
};

const idsByLang = {};
for (const [lang, marker] of Object.entries(markers)) {
  const blockStart = fn.indexOf(marker);
  let blockEnd = fn.length;
  for (const otherMarker of Object.values(markers)) {
    const markerIndex = fn.indexOf(otherMarker, blockStart + marker.length);
    if (markerIndex > -1) blockEnd = Math.min(blockEnd, markerIndex);
  }
  const block = fn.slice(blockStart, blockEnd);
  const ids = [...block.matchAll(/getElementById\("([^"]+)"\)/g)].map((match) => match[1]);
  idsByLang[lang] = [...new Set(ids)];
}

const pt = new Set(idsByLang["pt-Br"]);
for (const lang of ["cat", "en"]) {
  const missing = [...pt].filter((id) => !idsByLang[lang].includes(id));
  const extra = idsByLang[lang].filter((id) => !pt.has(id));
  console.log(`${lang}: ${idsByLang[lang].length} ids`);
  console.log(`missing: ${missing.length} ${missing.join(",")}`);
  console.log(`extra: ${extra.length} ${extra.join(",")}`);
}
console.log(`pt-Br: ${idsByLang["pt-Br"].length} ids`);

const enStart = fn.indexOf(markers.en);
const enBlock = fn.slice(enStart);
const suspiciousTerms =
  /Voc|Rela|torcida|treinador|companheir|Energia|Dinheiro|Passe|Defesa|Chute|Força|Velocidade|Escolha|Treinar|comprar|casa|aluguel|pr[oó]ximo|jogo|RECOMENDADO|DICA|HABILITIES|strenght|futebol|Sal[aá]rio|Portugu/i;
console.log("\nSuspicious English lines:");
enBlock.split(/\r?\n/).forEach((line, index) => {
  if (suspiciousTerms.test(line)) console.log(`${index + 1}: ${line.trim()}`);
});
