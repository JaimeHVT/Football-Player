const path = require("path");
const { chromium } = require("C:/Users/jtane/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const fileUrl = "file:///" + path.resolve(__dirname, "..", "index.html").replaceAll("\\", "/");
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(fileUrl);
  await page.waitForLoadState("load");
  const languageState = await page.evaluate(() => ({
    languageDisplay: getComputedStyle(document.getElementById("D85")).display,
    flagCount: document.querySelectorAll("#D85 .bandeiraIdioma").length,
    bodyWidth: document.body.scrollWidth,
    viewportWidth: innerWidth,
  }));
  await page.locator('img[alt="English"]').click();
  await page.locator("#D86").click();
  const menuState = await page.evaluate(() => ({
    menuDisplay: getComputedStyle(document.getElementById("D63")).display,
    careerText: document.getElementById("BT1").textContent,
    bodyWidth: document.body.scrollWidth,
    viewportWidth: innerWidth,
  }));
  await browser.close();
  if (errors.length) throw new Error(errors.join("\n"));
  if (languageState.flagCount !== 3) throw new Error(`Expected 3 language flags, got ${languageState.flagCount}`);
  if (menuState.careerText !== "Career mode") throw new Error(`English menu did not apply: ${menuState.careerText}`);
  if (languageState.bodyWidth > languageState.viewportWidth + 2) throw new Error("Language screen overflows horizontally on mobile.");
  if (menuState.bodyWidth > menuState.viewportWidth + 2) throw new Error("Menu screen overflows horizontally on mobile.");
  console.log("Mobile UI smoke test passed.");
})();
