import { OUTPUT } from "../config/index.js";
import { createJsonFile, currentpath, dirname } from "./utils.js";

export default async function scraper (url, browser, scrape = async () => {}, scriptPath = import.meta.url, filename = '', closeBrowser = true) {
  let page = await browser.newPage();

  // Listening log from console
  page.on('console', message => console.log(`${message.type().substr(0, 3).toUpperCase()} ${message.text()}`));

  console.log(`Navigating to ${url}...\n`);

  await page.goto(url);

  console.log(`Starting to crawl [${url}]...`);
  // Extract the results from the given page.
  const result = await scrape(page);
  console.log(`Finish to crawl [${url}]...\n`);

  console.log(`Starting to save [${url}]...`)
  // Create json file with space format as 2
  let currentPath = currentpath(scriptPath);
  filename =  filename || dirname(scriptPath);
  createJsonFile(result, `${currentPath}/../${OUTPUT || '_output'}/${filename}.json`);
  console.log(`Finish to save [${url}]...\n`)

  if (closeBrowser) {
    browser.close();
  }
}
