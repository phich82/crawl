import scraper from '../../../shared/scaper.js';
import { SITES } from '../../../config/index.js';
import { emptyDir, currentpath } from '../../../shared/utils.js';

const CURRENT_PATH = currentpath(import.meta.url);

export default async function scrape (browser, scriptPath = import.meta.url) {
  let url = SITES.NSHOPVN_COM.URL;

  emptyDir(`${CURRENT_PATH}/../_output`);

  await scraper(url, browser, async (page) => {
    // Extract the results from the page.
    return await page.evaluate(() => {
      return [...document.querySelectorAll('.widget-categories .main-category')].map(element => {
        const link = element.querySelector('.cat-link');
        const category = element.querySelector('.cat-name');
        return {
          link: link ? link.href : '',
          name: category ? category.innerHTML : '',
          menus: [
            // {
            //   name: '',
            //   submenus: [
            //     {
            //       name: '',
            //       description: '',
            //       price: 0,
            //       image: '',
            //     },
            //   ],
            // },
          ],
        };
      });
    });
  },scriptPath, `categories`, false);

  browser.close();
}
