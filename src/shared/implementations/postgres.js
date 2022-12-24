import pg from 'pg';

const Pgsql = {
  connection: null,
  async connect(config = {}) {
    this.connection = new pg.Client({
      host: 'localhost',
      user: 'postgres',
      password: 'postgres',
      database: '',
      port: 5432,
      ...config
    });
    // this.connection = new Pool({
    //   host: 'localhost',
    //   user: 'postgres',
    //   password: 'postgres',
    //   database: '',
    //   max: 20,
    //   idleTimeoutMillis: 30000,
    //   connectionTimeoutMillis: 2000,
    //   ...config,
    // });
    this.connection.connect();
    this.connection.on('error', (err) => {
      console.error('System error => ', err.stack);
    });
    this.connection.on('end', (err) => {
      console.log('Client has disconnected.');
    })
    this.connection.on('notice', (msg) => console.warn('notice:', msg));

    console.log('Connected to database...');
    return this;
  },
  async query(sql, binding = null) {
    return await this.connection.query({ rowMode: 'object', text: sql }, binding);
  }
};

export default Pgsql;
