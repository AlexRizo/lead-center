import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../database/database.js';

class Role extends Model { }
  
Role.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: new DataTypes.STRING(20),
            allowNull: false,
        },
    },
    {
        tableName: 'roles',
        sequelize, // passing the `sequelize` instance is required;
    },
);

export default Role;