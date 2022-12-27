import sequelize from '../../shared/db.js';
import { DataTypes, Model } from 'sequelize';
import { Category } from './Category.js';

export class Menu extends Model {

}

Menu.init({
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
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      // This is a reference to another model
      model: Category,
      // This is the column name of the referenced model
      key: 'id',
    }
  },
}, {
  // Options
  sequelize,
  tableName: 'menu',
  timestamps: true,
  paranoid: true,
  underscored: true,
});
