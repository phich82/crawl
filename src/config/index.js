export const OUTPUT = '_output';

export const DB_TYPE = 'pgsql';

export const SITES = {
  BOOKS_TOSCAPE_COM: {
    PROTOCOL: 'http',
    DOMAIN: 'books.toscrape.com',
    URL: 'http://books.toscrape.com',
  },
};

export const DB_CONFIG = {
  [SITES.BOOKS_TOSCAPE_COM.DOMAIN]: {
    mysql: {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'crawl',
      port: 3306,
    },
    pgsql: {
      host: 'localhost',
      user: 'postgres',
      password: 'postgres',
      database: 'crawl',
      port: 5432,
    },
    maria: {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'crawl',
      port: 3306,
    },
    mssql: {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'crawl',
      port: 1433,
    },
    mongo: {
      host: 'localhost',
      user: '',
      password: '',
      database: '',
      port: 27017,
    },
  }
}
