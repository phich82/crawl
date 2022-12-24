import scraper from '../../../shared/scaper.js';
import { SITES } from '../../../config/index.js';

export default async function scrape (browser, scriptPath = import.meta.url) {
  for (let i=1; i <= 5; i++ ) {

    let url = SITES.BOOKS_TOSCAPE_COM.URL;
    if (i > 1) {
      url = `${url}/catalogue/page-${i}.html`;
    }
    await scraper(url, browser, async (page) => {
      // Extract the results from the page.
      return await page.evaluate(() => {
        return [...document.querySelectorAll('.row .row li')].map(element => {
          const img = element.querySelector('.thumbnail');
          return {
            description: img.alt,
            image: img.src,
            price: element.querySelector('.price_color').innerHTML
          };
        });
      });
    },scriptPath, `home-${i}`, false);
  }
  browser.close();
}
