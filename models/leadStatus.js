import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../database/database.js';

class LeadStatus extends Model { }
  
LeadStatus.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: new DataTypes.STRING(55),
            allowNull: false,
        },
    },
    {
        tableName: 'lead_status',
        sequelize, // passing the `sequelize` instance is required;
    },
);

export default LeadStatus;
