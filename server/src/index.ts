import express from 'express';
import dotenv from 'dotenv';
import cookieParser  from "cookie-parser";

const app = express();
app.use(express.json());
dotenv.config();

import { connectDB } from './config/db';

const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:5173', 
  methods : ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, 
};

app.use(cors(corsOptions));
app.use(cookieParser());

connectDB()

app.listen(3131, () => {       
    console.log('Server is running on port 3131');
});