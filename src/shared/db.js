import createDB from './implementations/sequelize.js';
import { DB_CONFIG, SITES } from './../config/index.js';

// const DB = createDB({ ...DB_CONFIG[SITES.BOOKS_TOSCAPE_COM.DOMAIN].pgsql, type: 'postgres' });
const DB = createDB({ ...DB_CONFIG[SITES.BOOKS_TOSCAPE_COM.DOMAIN].mysql, type: 'mysql' });

export default DB;
