import express from 'express';
import { createAccount, createTransaction, getAccountTransactions,} from '../controller/accountController.js';

const accountRouter = express.Router();

accountRouter.post('/accounts', createAccount);
accountRouter.post('/transactions', createTransaction);
accountRouter.get('/accounts/:accountId', getAccountTransactions);

export default accountRouter;
