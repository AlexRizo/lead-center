import { Sequelize } from "sequelize";

const sequelize = new Sequelize('andarah', 'root', '78204991+?-', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
});

export default sequelize;