import { Sequelize } from 'sequelize';


const sequelize = new Sequelize('transaction', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, 
});

export {sequelize};