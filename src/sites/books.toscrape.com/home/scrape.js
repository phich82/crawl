import scraper from '../../../shared/scaper.js';
import { SITES } from '../../../config/index.js';

const IMAGES_PATH = 'images';

export default async function scrape (browser, scriptPath = import.meta.url) {
  let url = SITES.BOOKS_TOSCAPE_COM.URL;
  for (let i=1; i <= 50; i++ ) {
    if (i > 1) {
      url = `${url}/catalogue/page-${i}.html`;
    }
    await scraper(url, browser, async (page) => {
      // Extract the results from the page.
      return await page.evaluate(() => {
        return [...document.querySelectorAll('.row .row li')].map(element => {
          const image = element.querySelector('.thumbnail');
          const filename = String(image.src || '').split('/').pop();
          const imagePath = `${IMAGES_PATH}/${filename}`;
          return {
            detail_link: image.closest('a').href,
            name: image.alt,
            description: '',
            image: imagePath,
            price: element.querySelector('.price_color').innerHTML
          };
        });
      });
    },scriptPath, `home-${i}`, false);
  }
  browser.close();
}
