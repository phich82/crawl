import { createJsonFile, currentpath, readJsonFile } from '../../../shared/utils.js';

const CURRENT_PATH = currentpath(import.meta.url);

export default async function scrapeSubmenu (browser, scriptPath = import.meta.url) {

  let filePath = `${CURRENT_PATH}/../_output/categories.json`;
  readJsonFile(filePath, (err, data) => {
    if (!err && Array.isArray(data)) {
      data.forEach(async (item, index) => {
        item.menus.forEach(async (itemMenu, indexMenu) => {

          // Open given category page
          let page = await browser.newPage();
          page.on('console', message => console.log(`${message.type().substr(0, 3).toUpperCase()} ${message.text()}`));
          await page.goto(itemMenu.link, { timeout: 0 });
          // Get submenus of product
          itemMenu.submenus = await page.evaluate(() => {
            const submenus = document.querySelectorAll('.product-container .products .product');
            return [...submenus].map(elem => {
              let link = elem.querySelector('a');
              let image = elem.querySelector('img');
              let name = elem.querySelector('.product-title');
              let price = elem.querySelector('.price ins');
              return {
                detail_link: link ? link.href : '',
                name: name ? name.innerHTML : '',
                image: image ? image.src : '',
                price: price ? price.innerHTML : 0,
                description: '',
                details: null,
              };
            });
          });
          // Update submenu in json file
          data[index].menus[indexMenu] = itemMenu;
          createJsonFile(data, filePath);
          console.log('Submenu updated: ', `${index} x ${indexMenu}`);

        });
      });
    }
  });

  // browser.close();
}
