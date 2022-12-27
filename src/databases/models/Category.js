import sequelize from '../../shared/db.js';
import { DataTypes, Model } from 'sequelize';

export class Category extends Model {

}

Category.init({
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
}, {
  // Options
  sequelize,
  tableName: 'category',
  timestamps: true,
  paranoid: true,
  underscored: true,
});
