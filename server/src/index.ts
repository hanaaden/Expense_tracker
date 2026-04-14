import express from 'express';
import dotenv from 'dotenv';
import cookieParser  from "cookie-parser";

const app = express();
app.use(express.json());
dotenv.config();

import { connectDB } from './config/db';
import authRouter from './routes/Auth.Router';
import addExpense from './routes/AddExpeneses.router';
import updateExpense  from './routes/updateRouter.Router';
import getExpense  from './routes/getRouter.router';
import deleteExpense  from './routes/deleteExpense.router';
import getCategories  from './routes/getCategries.router';
import  getProfile  from './routes/getProfile.router';

const cors = require('cors');

const corsOptions = {
  // origin: 'http://localhost:5173', 
  origin: 'https://expense-tracker-iota-snowy-75.vercel.app', 
  methods : ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, 
};

app.use(cors(corsOptions));
app.use(cookieParser());

connectDB()

app.use("/",authRouter)
app.use("/" , addExpense)
app.use("/" , updateExpense)
app.use("/" , getExpense)
app.use("/" , deleteExpense)
app.use("/" , getCategories)
app.use("/" , getProfile)
app.listen(3131, () => {       
    console.log('Server is running on port 3131');
});