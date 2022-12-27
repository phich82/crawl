import { createJsonFile, currentpath, readJsonFile } from '../../../shared/utils.js';

const CURRENT_PATH = currentpath(import.meta.url);

export default async function scrapeSubmenuDetail (browser, scriptPath = import.meta.url) {

  let filePath = `${CURRENT_PATH}/../_output/categories.json`;
  readJsonFile(filePath, (err, data) => {
    if (err || !Array.isArray(data)) {
      return false;
    }
    data.forEach((item, index) => {
      item.menus.forEach((itemMenu, indexMenu) => {
        itemMenu.submenus.forEach(async (itemSubmenu, indexSubmenu) => {
          // Open details page of product
          let page = await browser.newPage();
          page.on('console', message => console.log(`${message.type().substr(0, 3).toUpperCase()} ${message.text()}`));
          await page.goto(itemSubmenu.detail_link, { timeout: 0 });
          // Get description of product
          itemSubmenu.description = await page.evaluate(() => {
            let description = document.querySelector('.product-description .content > p:first-child');
            return description ? description.innerHTML : '';
          });
          // Update submenu in json file
          data[index].menus[indexMenu].submenus[indexSubmenu] = itemSubmenu;
          createJsonFile(data, filePath);
          console.log('Submenu details updated: ', `${index} x ${indexMenu} x ${indexSubmenu}`);
        });
      });
    });
  });

  // browser.close();
}
