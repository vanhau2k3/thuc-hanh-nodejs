import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('textnodejs', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

export default sequelize;