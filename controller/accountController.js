import Account from '../models/accounts.js';
import Transaction from '../models/transaction.js';
import AccountTransaction from '../models/accountTransaction.js';
import { sequelize } from '../config/database.js';


export const createAccount = async (req, res) => {
    try {
      const { name, balance } = req.body;
      const account = await Account.create({ name, balance });
      res.status(201).json(account);
    } catch (error) {
      console.error('Error creating account:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

  export const createTransaction = async (req, res) => {
    let transaction;
    let responseSent = false; // Flag to track if a response has been sent
  
    try {
      const { senderAccountId, receiverAccountId, amount, type, description } = req.body;
  
      if (!senderAccountId || !receiverAccountId) {
        return res.status(400).json({ error: 'Both sender and receiver account IDs are required for creating a transaction.' });
      }
  
      await sequelize.transaction(async (t) => {
        const senderAccount = await Account.findByPk(senderAccountId, { transaction: t });
        const receiverAccount = await Account.findByPk(receiverAccountId, { transaction: t });
  
        if (!senderAccount || !receiverAccount) {
          return res.status(404).json({ error: 'One or both accounts not found.' });
        }
  
        if (senderAccount.balance < amount) {
          return res.status(400).json({ error: 'Insufficient funds in the sender account.' });
        }
  
        transaction = await Transaction.create({ amount, type, description }, { transaction: t });
  
        await senderAccount.decrement('balance', { by: amount, transaction: t });
        await receiverAccount.increment('balance', { by: amount, transaction: t });
  
        await AccountTransaction.create({ AccountId: senderAccountId, TransactionId: transaction.id }, { transaction: t });
        await AccountTransaction.create({ AccountId: receiverAccountId, TransactionId: transaction.id }, { transaction: t });
  
        // All transactional operations completed successfully
        // Set the transaction variable to indicate success
        transaction = { message: 'Transaction Completed Successfully', transaction };
      });
  
      // If the transaction was successful, send the response
      if (transaction && !responseSent) {
        res.status(200).json(transaction);
        responseSent = true; // Set the flag to true after sending the response
      }
    } catch (error) {
      // If an error occurs, rollback the transaction
      console.error('Error creating transaction:', error);
  
      // Check if a response has not already been sent before sending an error response
      if (!responseSent) {
        res.status(500).json({ error: 'Internal Server Error' });
        responseSent = true; // Set the flag to true after sending the response
      }
    }
  };
  



// Get all transactions for a specific account
export const getAccountTransactions = async (req, res) => {
  try {
    const { accountId } = req.params;

    const account = await Account.findByPk(accountId, {
      include: {
        model: Transaction,
        through: { attributes: [] }, 
      },
    });

    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    res.status(200).json({ account });
  } catch (error) {
    console.error('Error getting account transactions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Other controller methods for updating accounts, retrieving transactions, etc.
