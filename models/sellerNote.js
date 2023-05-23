import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../database/database.js';
import Staff from './staff.js';
import User from './user.js';

class SellerNote extends Model { }
  
SellerNote.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: new DataTypes.STRING(500),
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        staffId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
        }
    },
    {
        tableName: 'seller_notes',
        sequelize, // passing the `sequelize` instance is required
    },
);

Staff.hasMany(SellerNote, { foreignKey: 'staffId', targetKey:'id' });
SellerNote.belongsTo(Staff);

User.hasMany(SellerNote, { foreignKey: 'userId', targetKey:'id' });
SellerNote.belongsTo(User);


export default SellerNote;