import { Product } from '../../databases/models/Product.js';
import { currentpath, readJsonFromDir } from '../../shared/utils.js';

(async () => {
  /************************ TABLE - PRODUCT **************************/

  // Current script path (push.js)
  let currentPath = currentpath(import.meta.url);

  // Truncate table
  await Product.truncate({ cascade: true, force: true, restartIdentity: true });

  // Loop data
  readJsonFromDir(`${currentPath}/_output`, async (err, data, index) => {
    if (!err && Array.isArray(data)) {
      data.forEach(async (item, index) => {
        // Save to database
        await Product.create({
          name: String(item.name).length > 200 ? String(item.name).substring(0, 199) : item.name,
          description: item.description,
          image: item.image,
          price: Number(String(item.price).replace('£', '') || 0),
        });
      });
    }
  }, true);

  /********************* END - TABLE - PRODUCT ***********************/
})();
