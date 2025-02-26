import puppeteer from "puppeteer";
import fs from "fs";

// List of episode URLs to scrape
const episodeUrls = [
  "https://toonstream.co/episode/tying-the-knot-with-an-amagami-sister-1x17/",
  "https://toonstream.co/episode/tying-the-knot-with-an-amagami-sister-1x16/",
  "https://toonstream.co/episode/tying-the-knot-with-an-amagami-sister-1x15/",
  "https://toonstream.co/episode/tying-the-knot-with-an-amagami-sister-1x14/",
  "https://toonstream.co/episode/tying-the-knot-with-an-amagami-sister-1x13/",
  "https://toonstream.co/episode/tying-the-knot-with-an-amagami-sister-1x12/",
  "https://toonstream.co/episode/tying-the-knot-with-an-amagami-sister-1x11/",
  "https://toonstream.co/episode/tying-the-knot-with-an-amagami-sister-1x10/",
];

const scrapeIframeTrid = async (url, page) => {
  try {
    await page.goto(url, { waitUntil: "domcontentloaded" });

    // Extract iframe src
    const iframeSrc = await page.evaluate(() => {
      const iframe = document.querySelector(
        "iframe[src*='trembed=1'], iframe[data-src*='trembed=1']"
      );
      return iframe
        ? iframe.getAttribute("src") || iframe.getAttribute("data-src")
        : null;
    });

    if (iframeSrc) {
      const urlParams = new URLSearchParams(new URL(iframeSrc).search);
      const trid = urlParams.get("trid");
      console.log(`Extracted trid from ${url}: ${trid}`);
      return { url, trid };
    } else {
      console.log(`No matching iframe found for ${url}`);
      return { url, trid: null };
    }
  } catch (error) {
    console.error(`Error scraping ${url}:`, error);
    return { url, trid: null };
  }
};

const main = async () => {
  const browser = await puppeteer.launch({ headless: true });

  // Limit concurrency to 5 pages at a time
  const concurrencyLimit = 5;
  const pages = await Promise.all(
    Array.from({ length: concurrencyLimit }).map(() => browser.newPage())
  );

  // Process URLs in batches
  const results = [];
  for (let i = 0; i < episodeUrls.length; i += concurrencyLimit) {
    const batch = episodeUrls.slice(i, i + concurrencyLimit);
    const batchResults = await Promise.all(
      batch.map((url, index) => scrapeIframeTrid(url, pages[index]))
    );
    results.push(...batchResults);
  }

  await browser.close();

  // Save results to a JSON file
  fs.writeFileSync("results.json", JSON.stringify(results, null, 2));
  console.log("Scraping complete! Results saved in results.json");
};

main();
