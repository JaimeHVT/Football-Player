const fs = require("fs");
const path = require("path");

const file = path.resolve(__dirname, "..", "index.html");
let html = fs.readFileSync(file, "utf8");
html = html.replace(
  /function irParaLoja\(\)\{\s*document\.getElementById\("menu"\)\.style\.display="none";\s*document\.getElementById\("D17"\)\.style\.display="block";\s*if \(idioma === "pt-Br"\)\{\s*document\.getElementById\("L15"\)\.textContent="Dinheiro: " \+ dinheiro \+ " €";\s*\} else if \(idioma === "cat"\)\{\s*document\.getElementById\("L15"\)\.textContent="Diners: " \+ dinheiro \+ " €";\s*\}\s*\}/,
  `function irParaLoja(){
            document.getElementById("menu").style.display="none";
            document.getElementById("D17").style.display="block";
            atualizarDinheiroLoja();
        }`,
);
fs.writeFileSync(file, html, "utf8");
