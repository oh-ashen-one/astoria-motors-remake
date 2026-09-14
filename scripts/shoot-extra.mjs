import { chromium } from "playwright";
import fs from "node:fs";

const BASE = process.env.BASE_URL || "http://localhost:4350/astoria-motors-remake/";
const OUT = process.env.OUT_DIR || "/tmp/astoria-shots";
fs.mkdirSync(OUT, { recursive: true });

const run = async () => {
  const browser = await chromium.launch();

  // mobile nav open
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  await page.click(".hamburger");
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${OUT}/mobile-10-navopen.png` });
  await page.close();

  // reduced motion desktop
  const page2 = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  const errs = [];
  page2.on("pageerror", (e) => errs.push(e.message));
  await page2.goto(BASE, { waitUntil: "networkidle" });
  await page2.waitForTimeout(1200);
  await page2.screenshot({ path: `${OUT}/reduced-00-hero.png` });
  const anchors = await page2.evaluate(() => {
    const top = (sel) =>
      document.querySelector(sel).getBoundingClientRect().top + window.scrollY;
    return { showcase: top(".showcase-static"), financing: top(".financing") };
  });
  await page2.evaluate((y) => window.scrollTo(0, y), anchors.showcase - 100);
  await page2.waitForTimeout(500);
  await page2.screenshot({ path: `${OUT}/reduced-01-showcase.png` });
  if (errs.length) console.log("REDUCED ERRORS:", errs.join(" | "));
  await page2.close();

  await browser.close();
  console.log("done");
};
run().catch((e) => {
  console.error(e);
  process.exit(1);
});
