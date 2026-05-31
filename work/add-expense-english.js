const fs = require("fs");
const path = require("path");

const file = path.resolve(__dirname, "..", "index.html");
let html = fs.readFileSync(file, "utf8");

const start = html.indexOf("function calcularDespesasSemanais");
const end = html.indexOf("function comidaMais", start);
let block = html.slice(start, end);
if (!block.includes('idioma === "en"')) {
  block = block.replace(
    /\n\s*\}\s*\n\s*\}\s*$/,
    `\n            } else if (idioma === "en"){\n                document.getElementById("L27").textContent = "Food: " + despesas.comida + " €";\n                document.getElementById("L28").textContent = "Transport: " + despesas.transporte + " €";\n                document.getElementById("L29").textContent = "Income tax: " + despesas.impostoDeRenda + " €";\n                document.getElementById("L31").textContent = "Bank fees: " + despesas.comissaoBancaria + " €";\n                document.getElementById("L32").textContent = "Mobile data: " + despesas.dadosMoveis + " €";\n                document.getElementById("L40").textContent = "Apartment rent: " + despesas.aluguelApartamento + " €";\n            }\n        }\n\n`,
  );
  html = html.slice(0, start) + block + html.slice(end);
}

fs.writeFileSync(file, html, "utf8");
