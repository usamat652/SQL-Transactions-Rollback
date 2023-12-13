import { sequelize } from '../config/database.js';
import Account from './accounts.js';
import Transaction from './transaction.js';

const AccountTransaction = sequelize.define('AccountTransaction', {});

Account.belongsToMany(Transaction, { through: AccountTransaction });
Transaction.belongsToMany(Account, { through: AccountTransaction });

export default AccountTransaction;
