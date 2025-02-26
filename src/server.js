import express from "express";
import puppeteer from "puppeteer";
import cors from "cors";

const app = express();
app.use(cors());
const PORT = 5000;

// Cache to avoid repeated requests
const cache = new Map();
let browser;

// Function to launch Puppeteer browser
const launchBrowser = async () => {
  if (!browser) {
    browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
  }
};

// Function to scrape the `trid` from the episode page
const getTrid = async (animeName, episode) => {
  if (!animeName || !episode) throw new Error("Missing parameters");

  const url = `https://toonstream.co/episode/${animeName}-1x${episode}/`;
  console.log(`Scraping TRID from: ${url}`);

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });

  // Wait for iframe to load
  await page.waitForSelector("iframe", { timeout: 20000 });

  // Get the correct iframe's `trid`
  const trid = await page.evaluate(() => {
    const iframe = document.querySelector(
      "iframe[src*='trembed='], iframe[data-src*='trembed=']"
    );
    if (!iframe) return null;

    const src = iframe.getAttribute("src") || iframe.getAttribute("data-src");
    if (!src) return null;

    const urlParams = new URLSearchParams(new URL(src).search);
    return urlParams.get("trid");
  });

  await page.close();

  if (!trid) throw new Error("TRID not found");
  return trid;
};

// API Route to get `trid`
app.get("/getTrid", async (req, res) => {
  const { anime, episode } = req.query;
  if (!anime || !episode)
    return res.status(400).json({ error: "Missing parameters" });

  const cacheKey = `${anime}-${episode}`;
  if (cache.has(cacheKey)) {
    return res.json({ trid: cache.get(cacheKey) });
  }

  try {
    const trid = await getTrid(anime, episode);
    cache.set(cacheKey, trid);
    res.json({ trid });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch TRID" });
  }
});

// Start server and launch Puppeteer
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await launchBrowser();
});

// Graceful shutdown
process.on("exit", async () => {
  if (browser) await browser.close();
});
