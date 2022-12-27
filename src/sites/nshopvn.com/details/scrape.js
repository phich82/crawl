import { createJsonFile, currentpath, readJsonFile } from '../../../shared/utils.js';

const CURRENT_PATH = currentpath(import.meta.url);

export default async function scrape (browser, scriptPath = import.meta.url) {

  let filePath = `${CURRENT_PATH}/../_output/categories.json`;
  readJsonFile(filePath, (err, data) => {
    if (!err && Array.isArray(data)) {
      data.forEach(async (item, index) => {
        // Open given category page
        let page = await browser.newPage();
        page.on('console', message => console.log(`${message.type().substr(0, 3).toUpperCase()} ${message.text()}`));
        await page.goto(item.link, { timeout: 0 });
        // Get menus of product
        item.menus = await page.evaluate(() => {
          // Get menu content
          const submenus = document.querySelectorAll('.widget-categories .active .sub-categories .cat-link');
          return [...submenus].map(elem => {
            let elementName = elem.querySelector('span');
            return {
              link: elem ? elem.href : '',
              name: elementName ? elementName.innerHTML : '',
              submenus: [],
            }
          });
        });
        // Update menu in json file
        data[index] = item;
        createJsonFile(data, filePath);
        console.log('Menu updated', item);
      });
    }
  });

  // browser.close();
}
