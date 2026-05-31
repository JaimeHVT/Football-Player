const fs = require("fs");
const path = require("path");

const file = path.resolve(__dirname, "..", "index.html");
let html = fs.readFileSync(file, "utf8");

function insertAfter(needle, addition) {
  const index = html.indexOf(needle);
  if (index === -1) throw new Error(`Needle not found: ${needle.slice(0, 80)}`);
  html = html.slice(0, index + needle.length) + addition + html.slice(index + needle.length);
}

function replace(needle, replacement) {
  const index = html.indexOf(needle);
  if (index === -1) throw new Error(`Needle not found: ${needle.slice(0, 80)}`);
  html = html.slice(0, index) + replacement + html.slice(index + needle.length);
}

insertAfter(
  '                <button id="BT52" onclick="comprar0012()">Comprar</button>\r\n            </div>',
  `\r\n            <div id="P0013" class="produto">\r\n                <label id="LT389">Precision Control Boots</label>\r\n                <img src="img/Products/1/Precision Control Boots.svg">\r\n                <label>420,00€</label>\r\n                <button id="BT160" onclick="comprar0013()">Comprar</button>\r\n            </div>`,
);

insertAfter(
  '                <button id="BT57" onclick="comprar0024()">Comprar</button>\r\n            </div>',
  `\r\n            <div id="P0025" class="produto">\r\n                <label id="LT390">Electric Scooter Pro</label>\r\n                <img src="img/Products/2/Electric Scooter Pro.svg">\r\n                <label>890,00€</label>\r\n                <button id="BT161" onclick="comprar0025()">Comprar</button>\r\n            </div>`,
);

insertAfter(
  '                <button id="BT64" onclick="comprar0043()">Comprar</button>\r\n            </div>',
  `\r\n            <div id="P0044" class="produto">\r\n                <label id="LT391">FitBand Pro</label>\r\n                <img src="img/Products/4/FitBand Pro.svg">\r\n                <label>180,00€</label>\r\n                <button id="BT162" onclick="comprar0044()">Comprar</button>\r\n            </div>`,
);

insertAfter(
  '                <button id="BT142" onclick="comprar0052()">Comprar</button>\r\n            </div>',
  `\r\n            <div id="P0053" class="produto">\r\n                <label id="LT392">Black Cat</label>\r\n                <img src="img/Products/5/Black Cat.svg">\r\n                <label>650,00€</label>\r\n                <button id="BT163" onclick="comprar0053()">Comprar</button>\r\n            </div>`,
);

insertAfter(
  '        function comprar0012(){',
  '',
);

fs.writeFileSync(file, html, "utf8");
