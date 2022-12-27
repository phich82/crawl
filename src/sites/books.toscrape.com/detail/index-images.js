import startBrowser from "../../../shared/browser.js";
import scrapeImages from "./scrape-images.js";

(async () => {
  try {
    await scrapeImages(await startBrowser(true));
  } catch (err) {
    console.log("Could not resolve the browser instance => ", err);
  }
})();
