import { chromium } from "playwright";
import fs from "node:fs";

const BASE = process.env.BASE_URL || "http://localhost:4350/astoria-motors-remake/";
const OUT = process.env.OUT_DIR || "/tmp/astoria-shots";
fs.mkdirSync(OUT, { recursive: true });

const errors = [];

async function shootPage(page, name, positions) {
  for (const [label, y] of positions) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(900);
    await page.screenshot({ path: `${OUT}/${name}-${label}.png` });
  }
}

const run = async () => {
  const browser = await chromium.launch();

  const viewports = (process.env.WIDTHS || "1440x900,390x844")
    .split(",")
    .map((s) => {
      const [w, h] = s.split("x").map(Number);
      return { name: w >= 1000 ? "desktop" : `m${w}`, width: w, height: h };
    });

  for (const cfg of viewports) {
    const page = await browser.newPage({
      viewport: { width: cfg.width, height: cfg.height },
      deviceScaleFactor: 1,
    });
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(`[${cfg.name}] console: ${m.text()}`);
    });
    page.on("pageerror", (e) => errors.push(`[${cfg.name}] pageerror: ${e.message}`));

    await page.goto(BASE, { waitUntil: "networkidle" });
    // let the hero intro finish (intro ends ~4.6s in)
    await page.waitForTimeout(5600);
    await page.screenshot({ path: `${OUT}/${cfg.name}-00-hero.png` });

    const anchors = await page.evaluate(() => {
      const top = (sel) => {
        const el = document.querySelector(sel);
        if (!el) return 0;
        return el.getBoundingClientRect().top + window.scrollY;
      };
      const track = document.querySelector(".showcase");
      const r = track.getBoundingClientRect();
      const trackTop = r.top + window.scrollY;
      const scrollable = r.height - window.innerHeight;
      return {
        values: Math.max(0, top(".values") - window.innerHeight * 0.5),
        steps: top(".steps") - window.innerHeight * 0.15,
        s25: trackTop + scrollable * 0.17,
        s55: trackTop + scrollable * 0.42,
        s85: trackTop + scrollable * 0.78,
        about: top(".about") - window.innerHeight * 0.15,
        financing: top(".financing") - window.innerHeight * 0.2,
        visit: top(".visit") - window.innerHeight * 0.1,
        footer: document.body.scrollHeight,
      };
    });

    await shootPage(page, cfg.name, [
      ["01-values", Math.round(anchors.values)],
      ["02-showcase25", Math.round(anchors.s25)],
      ["03-showcase55", Math.round(anchors.s55)],
      ["04-showcase85", Math.round(anchors.s85)],
      ["05-steps", Math.round(anchors.steps)],
      ["05b-about", Math.round(anchors.about)],
      ["06-financing", Math.round(anchors.financing)],
      ["07-visit", Math.round(anchors.visit)],
      ["08-footer", Math.round(anchors.footer)],
    ]);

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);
    await page.screenshot({ path: `${OUT}/${cfg.name}-09-full.png`, fullPage: true });

    await page.close();
  }

  await browser.close();
  if (errors.length) {
    console.log("CONSOLE/PAGE ERRORS:");
    for (const e of errors) console.log("  " + e);
  } else {
    console.log("No console or page errors.");
  }
  console.log("Shots saved to " + OUT);
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
