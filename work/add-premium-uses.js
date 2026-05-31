const fs = require("fs");
const path = require("path");

const file = path.resolve(__dirname, "..", "index.html");
let html = fs.readFileSync(file, "utf8");

html = html.replace(
  '<button id="BT76" onclick="vender0024()">Vender</button>',
  '<button id="BT76" onclick="vender0024()">Vender</button><br>\n            <button id="BT196" onclick="usar0024_1()">Chegar de supercarro ao treino</button>',
);

html = html.replace(
  '<button id="BT81" onclick="vender0032()">Vender</button>',
  '<button id="BT81" onclick="vender0032()">Vender</button><br>\n            <button id="BT197" onclick="usar0032_1()">Descansar na casa de luxo</button><br>\n            <button id="BT198" onclick="usar0032_2()">Receber companheiros</button>',
);

fs.writeFileSync(file, html, "utf8");
