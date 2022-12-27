import startBrowser from "../../../shared/browser.js";
import scrapeSubmenuDetail from "./scrape-submenu-detail.js";

(async () => {
  try {
    await scrapeSubmenuDetail(await startBrowser(true));
  } catch (err) {
    console.log("Could not resolve the browser instance => ", err);
  }
})();
