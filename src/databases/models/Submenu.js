import sequelize from '../../shared/db.js';
import { DataTypes, Model } from 'sequelize';
import { Menu } from './Menu.js';

export class Submenu extends Model {

}

Submenu.init({
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
  menu_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      // This is a reference to another model
      model: Menu,
      // This is the column name of the referenced model
      key: 'id',
    }
  },
}, {
  // Options
  sequelize,
  tableName: 'submenu',
  timestamps: true,
  paranoid: true,
  underscored: true,
});
