import mysql from 'mysql2/promise';

const Mysql = {
  connection: null,
  async connect(config = {}) {
    this.connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: '',
      port: 3306,
      ...config
    });
    console.log('Connected to database...');
    // const pool = mysql.createPool({ host: 'localhost', user: 'root', password: '', port: 3306, ...config });
    // this.connection = pool.promises();
    return this;
  },
  async query(sql, binding = []) {
    return await this.connection.execute(sql, binding);
  }
};

export default Mysql;
