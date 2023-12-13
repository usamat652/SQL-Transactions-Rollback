import express from 'express';
import accountRouter from './routers/accountRouter.js';
import {sequelize} from './config/database.js'

const app = express();

app.use(express.json());

app.use('/api', accountRouter);

async function syncModels() {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
      await sequelize.sync(); 
      console.log('Models synchronized with the database.');
    } catch (error) {
      console.error('Error syncing models with the database:', error);
    }
  }

  syncModels();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
