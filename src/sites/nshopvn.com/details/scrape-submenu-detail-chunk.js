import { createJsonFile, currentpath, emptyDir, ensureDirSync, existsFile, readJsonFile, readJsonFileSync, chunk } from '../../../shared/utils.js';

// Get arguments from CLI
const specifiedJsonFile = process.argv.slice(2).pop();

const CURRENT_PATH = currentpath(import.meta.url);

export default async function scrapeSubmenuDetailChunk(browser, scriptPath = import.meta.url) {

  let filePath = `${CURRENT_PATH}/../_output/categories.json`;

  const chunksDir = `${CURRENT_PATH}/../_output/chunks`;

  if (!specifiedJsonFile) {
    ensureDirSync(chunksDir);
    emptyDir(chunksDir);

    try {
      readJsonFileSync(filePath).forEach((row, index) => {
        let filename = `${chunksDir}/chunk-${index}.json`;
        createJsonFile(row, filename);
        console.log(`Created: ${filename}`);
      });
    } catch (err) {
      console.error('Could not read json file: ', err);
    }
    return;
  }

  const INDEX = Number(specifiedJsonFile.split('.')[0].split('-')[1]);
  console.log('INDEX => ', INDEX)

  if (typeof INDEX !== 'number') {
    console.log('Json filename invalid.');
    return;
  }

  const specifiedJsonFilePath = `${chunksDir}/${specifiedJsonFile}`;
  console.log('Json file => ', specifiedJsonFilePath);
  if (!existsFile(specifiedJsonFilePath)) {
    console.log('Json file not found.');
    return;
  }
  const data = readJsonFileSync(filePath);

  readJsonFile(specifiedJsonFilePath, (err, dataMenu) => {
    if (err) {
      return false;
    }
    dataMenu.menus.forEach((itemMenu, indexMenu) => {
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
        data[INDEX].menus[indexMenu].submenus[indexSubmenu] = itemSubmenu;
        createJsonFile(data, filePath);
        console.log('Submenu details updated: ', `${INDEX} x ${indexMenu} x ${indexSubmenu}`);
      });
    });
  });

  // browser.close();
}
