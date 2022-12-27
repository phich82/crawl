import startBrowser from "../../../shared/browser.js";
import scrapeSubmenuDetailChunk from "./scrape-submenu-detail-chunk.js";

(async () => {
  try {
    await scrapeSubmenuDetailChunk(await startBrowser(true));
  } catch (err) {
    console.log("Could not resolve the browser instance => ", err);
  }
})();
