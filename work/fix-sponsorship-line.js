const fs = require("fs");

const file = "index.html";
const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('document.getElementById("LT432").textContent') && lines[i].includes("vol patrocinar-te")) {
    lines[i] = '                document.getElementById("LT432").textContent = patrocinio.marca + " vol patrocinar-te durant 8 setmanes. La proposta paga " + patrocinio.bonusSemanal + "\\u20ac per setmana.";';
  }
}

fs.writeFileSync(file, lines.join("\n"), "utf8");
