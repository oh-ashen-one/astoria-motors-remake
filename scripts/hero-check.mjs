import { chromium } from "playwright";
import fs from "node:fs";

const OUT = "/tmp/hero-verify";
fs.mkdirSync(OUT, { recursive: true });

const servers = [
  { name: "dev", url: "http://localhost:5173/" },
  { name: "preview", url: "http://localhost:4351/astoria-motors-remake/" },
];
const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];
const waits = [1000, 3000, 6000, 12000];

const run = async () => {
  const browser = await chromium.launch();
  const errors = [];
  for (const srv of servers) {
    for (const vp of viewports) {
      const page = await browser.newPage({
        viewport: { width: vp.width, height: vp.height },
      });
      page.on("pageerror", (e) =>
        errors.push(`[${srv.name}/${vp.name}] ${e.message.slice(0, 160)}`)
      );
      page.on("console", (m) => {
        if (m.type() === "error")
          errors.push(`[${srv.name}/${vp.name}] console: ${m.text().slice(0, 160)}`);
      });
      await page.goto(srv.url, { waitUntil: "networkidle" });
      let elapsed = 0;
      for (const w of waits) {
        await page.waitForTimeout(w - elapsed);
        elapsed = w;
        await page.screenshot({
          path: `${OUT}/${srv.name}-${vp.name}-${w / 1000}s.png`,
        });
        // headless proof: is any hero element still invisible?
        const hidden = await page.evaluate(() => {
          const hero = document.querySelector(".hero");
          if (!hero) return "NO HERO";
          const targets = [...hero.querySelectorAll("div")].filter(
            (d) => d.children.length === 0 && d.textContent.trim().length > 3
          );
          const bad = targets.filter(
            (t) => parseFloat(getComputedStyle(t).opacity) < 0.9
          );
          return bad.length === 0
            ? "all-visible"
            : `HIDDEN: ${bad.map((b) => b.textContent.slice(0, 30)).join(" | ")}`;
        });
        console.log(`${srv.name}/${vp.name} @${w / 1000}s: ${hidden}`);
      }
      await page.close();
    }
  }
  await browser.close();
  if (errors.length) {
    console.log("ERRORS:");
    errors.forEach((e) => console.log("  " + e));
  } else {
    console.log("No console/page errors on any run.");
  }
};
run().catch((e) => {
  console.error(e);
  process.exit(1);
});
