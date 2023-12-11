// models/transaction.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Transaction = sequelize.define('Transaction', {
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('debit', 'credit'),
    allowNull: false,
  },
},{timestamps:false});

export default Transaction;
