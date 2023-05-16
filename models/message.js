import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../database/database.js';

class Message extends Model { }
  
Message.init(
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
        message: {
            type: new DataTypes.STRING(500),
            allowNull: false,
        },
    },
    {
        tableName: 'messages',
        sequelize, // passing the `sequelize` instance is required
    },
);

export default Message;