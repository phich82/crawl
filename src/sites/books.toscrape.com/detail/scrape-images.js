import { currentpath, download, emptyDir, readJsonFile } from '../../../shared/utils.js';

// Get arguments from CLI
const args = process.argv.slice(2).pop().split('-');
const from = Number(args[0]);
const to = Number(args[1]);

/********** Only download images from given data **********/
export default async function scrapeImages (browser, scriptPath = import.meta.url) {
  console.log(`Download images: home-${from}.json -> home-${to}.json`);

  let currentPath = currentpath(import.meta.url);
  let imagesPath = `${currentPath}/../_output/images`;

  // Delete images directory if exists
  emptyDir(imagesPath);

  for (let i = from; i <= to; i++) {
    let filePath = `${currentPath}/../_output/home-${i}.json`;
    readJsonFile(filePath, (err, data) => {
      if (!err && Array.isArray(data)) {
        data.forEach(async (item, index) => {
          let filename = String(item.image).split('/').pop();
          console.log('Downloaded => ', filename);
          await download(item.image, filename, `${imagesPath}`);
        });
      }
    });
  }

  // browser.close();
}
