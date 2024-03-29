import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../database/database.js';
import Staff from './staff.js';
import Origin from './origin.js';
import Platform from './platform.js';
import LeadStatus from './leadStatus.js';

class User extends Model { }
  
User.init(
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
        email: {
            type: new DataTypes.STRING(100),
            allowNull: false,
        },
        city: {
            type: new DataTypes.STRING(100),
            allowNull: false,
        },
        phone_number: {
            type: new DataTypes.STRING(15),
            allowNull: false,
        },
        reason: {
            type: new DataTypes.STRING(500),
            allowNull: false,
        },
        LeadStatusId: {
            type: new DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        date_contact: {
            type: new DataTypes.STRING(10),
            allowNull: false,
        },
        originId: {
            type: new DataTypes.INTEGER,
            allowNull: true,
        },
        platformId: {
            type: new DataTypes.INTEGER,
            allowNull: true,
        },
        staffId: {
            type: new DataTypes.INTEGER,
            allowNull: true,
        },
        note: {
            type: new DataTypes.STRING(500),
            allowNull: true,
        },
    },
    {
        tableName: 'users',
        sequelize, // passing the `sequelize` instance is required
    },
);

Staff.hasMany(User, { foreignKey: 'staffId', targetKey:'id', as:'asigned' });
User.belongsTo(Staff);

Origin.hasMany(User, { foreignKey: 'originId', targetKey:'id', as:'origin' });
User.belongsTo(Origin);

LeadStatus.hasMany(User, { foreignKey: 'originId', targetKey:'id', as:'leadStatus',  });
User.belongsTo(LeadStatus);

Platform.hasMany(User, { foreignKey: 'platformId', targetKey:'id', as:'platform' });
User.belongsTo(Platform);

export default User;