// routes/accountRoutes.js
import express from 'express';
import {
  createAccount,
  createTransaction,
  getAccountTransactions,
} from '../controller/accountController.js';

const accountRouter = express.Router();

// Create a new account
accountRouter.post('/accounts', createAccount);

// Create a new transaction and update the account balance
accountRouter.post('/transactions', createTransaction);

// Get all transactions for a specific account
accountRouter.get('/accounts/:accountId', getAccountTransactions);

export default accountRouter;
