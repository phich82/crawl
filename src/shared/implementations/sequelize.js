import { Sequelize } from 'sequelize';

const createDB = (config = {}, options = {}) => {
  if (typeof config === 'string') {
    return new Sequelize(config, options);
  }

  let database = config.database || '';
  let username = config.user || 'root';
  let password = config.password || '';
  let host = config.host || 'localhost';
  let port = config.port || 3306;
  let type = config.type || 'mysql';

  return new Sequelize(database, username, password, {
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    //    storage: 'path/to/database.sqlite' // Chỉ dùng khi là SQLite
    ...options,
    host,
    port,
    dialect: type, //'mysql'|'mariadb'|'sqlite'|'postgres'|'mssql',
  });
};

export default createDB;
