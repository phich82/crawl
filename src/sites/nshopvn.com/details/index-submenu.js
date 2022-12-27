import startBrowser from "../../../shared/browser.js";
import scrapeSubmenu from "./scrape-submenu.js";

(async () => {
  try {
    await scrapeSubmenu(await startBrowser(true));
  } catch (err) {
    console.log("Could not resolve the browser instance => ", err);
  }
})();
