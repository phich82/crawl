import { Category } from '../../databases/models/Category.js';
import { Menu } from '../../databases/models/Menu.js';
import { Submenu } from '../../databases/models/Submenu.js';
import { currentpath, readJsonFromDir } from '../../shared/utils.js';

(async () => {
  /************************ TABLE - CATEGORY **************************/

  // Current script path (push.js)
  let currentPath = currentpath(import.meta.url);

  // Truncate tables
  await Menu.sequelize.query("SET FOREIGN_KEY_CHECKS = 0", null);
  await Menu.truncate({ cascade: true, force: true, restartIdentity: true });

  await Submenu.truncate({ cascade: true, force: true, restartIdentity: true });

  await Category.truncate({ cascade: true, force: true, restartIdentity: true });
  await Category.sequelize.query("SET FOREIGN_KEY_CHECKS = 1", null);

  // Loop data
  readJsonFromDir(`${currentPath}/_output`, async (err, categories, index) => {
    if (!err && Array.isArray(categories)) {
      categories.forEach(async (category, indexCategory) => {
        // Save categories to database
        await Category.create({
          name: String(category.name).length > 200 ? String(category.name).substring(0, 199) : category.name,
          image: category.image || '',
        });
        // Save menus to database
        category.menus.forEach(async (menu, indexMenu) => {
          await Menu.create({
            name: menu.name,
            category_id: indexCategory + 1,
          });
          // Save submenus to database
          menu.submenus.forEach(async (submenu, indexSubmenu) => {
            let price = Number(submenu.price.replace('₫', '').split('.').join(''));
            await Submenu.create({
              name: submenu.name,
              description: submenu.description,
              image: submenu.image,
              price: !isNaN(price) ? price : 0,
              menu_id: indexMenu + 1,
            });
          });
        });
      });
    }
  }, true);

  /********************* END - TABLE - CATEGORY ***********************/
})();
