import { DB_CONFIG, SITES } from '../../config/index.js';
import Pgsql from '../../shared/implementations/postgres.js';
import Mysql from '../../shared/implementations/mysql.js';
import DB from '../../shared/db.js';
import { Product } from '../../databases/models/Product.js';

(async () => {
  const mysql = await Mysql.connect(DB_CONFIG[SITES.BOOKS_TOSCAPE_COM.DOMAIN].mysql);
  const pgsql = await Pgsql.connect(DB_CONFIG[SITES.BOOKS_TOSCAPE_COM.DOMAIN].pgsql);

  console.log('db => ', DB);

  const { fields, rows } = await pgsql.query('select 1');
  console.log(fields, rows);

  console.log('products => ', await Product.findAll());
  console.log('DB_CONFIG => ', DB_CONFIG)
})();
