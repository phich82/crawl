import { createJsonFile, currentpath, readJsonFile } from '../../../shared/utils.js';

const args = process.argv.slice(2).pop().split('-');
const from = Number(args[0]);
const to = Number(args[1]);

export default async function scrape (browser, scriptPath = import.meta.url) {
  console.log(`Update description: home-${from}.json -> home-${to}.json`);

  let currentPath = currentpath(import.meta.url);

  for (let i = from; i <= to; i++) {
    let filePath = `${currentPath}/../_output/home-${i}.json`;
    readJsonFile(filePath, (err, data) => {
      if (!err && Array.isArray(data)) {
        data.forEach(async (item, index) => {
          // Open detail page
          let page = await browser.newPage();
          page.on('console', message => console.log(`${message.type().substr(0, 3).toUpperCase()} ${message.text()}`));
          await page.goto(item.detail_link);
          // Get description of product
          item.description = await page.evaluate(() => {
            // Get description content
            const elem = document.querySelector('#product_description ~ p');
            return elem ? elem.innerHTML : '';
          });
          // Update description in json file
          data[index] = item;
          createJsonFile(data, filePath);
          console.log('Description updated', data);
        });
      }
    });
  }

  // browser.close();
}
