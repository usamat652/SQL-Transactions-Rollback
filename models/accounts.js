// models/account.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Account = sequelize.define('Account', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  balance: {
    type: DataTypes.DECIMAL(10, 2), 
    allowNull: false,
    defaultValue: 0.0,
  },
},{timestamps:false});

export default Account;
