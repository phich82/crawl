import startBrowser from "../../../shared/browser.js";
import scrape from "./scrape.js";

(async () => {
  try {
    await scrape(await startBrowser(true));
  } catch (err) {
    console.log("Could not resolve the browser instance => ", err);
  }
})();
