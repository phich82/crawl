import sequelize from '../../shared/db.js';
import { DataTypes, Model } from 'sequelize';

// export const Product = sequelize.define('Product', {
//     id: DataTypes.INTEGER,
//     name: DataTypes.STRING(200),
//     description: DataTypes.TEXT,
//     price: DataTypes.DOUBLE,
//     created_at: 'TIMESTAMP',
//     updated_at: 'TIMESTAMP',
//     deleted_at: 'TIMESTAMPE',
//   }, {
//   // Tự động/Không tự động thêm timestamp attribupripricetes (updatedAt, createdAt)
//   timestamps: true,
//   // softDelete, Sequelize sẽ tự động thêm attribute deletedAt, chỉ hoạt động khi bạn enable timestamps
//   paranoid: true,
//   // Sử dụng underscore style thay cho camel style (updatedAt sẽ là updated_at...)
//   underscored: true,
//   // Chỉ định tên table
//   tableName: 'product',
// });

export class Product extends Model {

}

Product.init({
  // Attributes
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  price: {
    type: DataTypes.DOUBLE,
    defaultValue: 0,
  },
}, {
  // Options
  sequelize,
  tableName: 'product',
  timestamps: true,
  paranoid: true,
  underscored: true,

  // Don't want show createdAt
  // createdAt: false,

  // Change updatedAt to updated_at
  // updatedAt: 'updated_at'
});

/**************************** ONLY FOR DEVELOPMENT ******************************/
// This creates the table if it doesn't exist (and does nothing if it already exists)
// await User.sync();
// This creates the table, dropping it first if it already existed
// await User.sync({ force: true });
// This checks what is the current state of the table in the database
// (which columns it has, what are their data types, etc), and then performs the necessary
// changes in the table to make it match the model.
// await User.sync({ alter: true });
// console.log("The table for the User model was just (re)created!");

// Synchronizing all models at once
// await sequelize.sync({ force: true });
// console.log("All models were synchronized successfully.");
/************************ END - ONLY FOR DEVELOPMENT ****************************/
