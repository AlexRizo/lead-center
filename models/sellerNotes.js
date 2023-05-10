import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../database/database.js';
import Staff from './staff.js';
import User from './user.js';

class SellerNotes extends Model { }
  
SellerNotes.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: new DataTypes.STRING(100),
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
            type: DataTypes.TIME,
        }
    },
    {
        tableName: 'seller_notes',
        sequelize, // passing the `sequelize` instance is required
    },
);

Staff.hasMany(SellerNotes, { foreignKey: 'staffId', targetKey:'id', as:'asigned' });
SellerNotes.belongsTo(Staff);

User.hasMany(SellerNotes, { foreignKey: 'userId', targetKey:'id', as:'user' });
SellerNotes.belongsTo(User);


export default SellerNotes;