const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(path.resolve(__dirname, "..", "index.html"), "utf8");
const declared = new Set([...html.matchAll(/\sid=(?:"([^"]+)"|([^\s>]+))/g)].map((m) => m[1] || m[2]));
const declaredList = [...html.matchAll(/\sid=(?:"([^"]+)"|([^\s>]+))/g)].map((m) => m[1] || m[2]);
const referenced = [...html.matchAll(/getElementById\(["']([^"']+)["']\)/g)].map((m) => m[1]);
const missing = [...new Set(referenced.filter((id) => !declared.has(id)))].sort();
if (missing.length) {
  console.log("Missing IDs:");
  console.log(missing.join("\n"));
  process.exit(1);
}
const duplicates = [...new Set(declaredList.filter((id, index) => declaredList.indexOf(id) !== index))].sort();
if (duplicates.length) {
  console.log("Duplicate IDs:");
  console.log(duplicates.join("\n"));
}
console.log(`All ${new Set(referenced).size} referenced DOM ids exist.`);
