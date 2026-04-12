import { Request , Response } from "express";
import {pool} from "../config/db";
import { CustomRequest } from "../types/costumRequest";
export const getExpense = async (req : CustomRequest , res : Response)=>{
    const userId = req.user?.id
try {
const expensesRes = await pool.query(
  `SELECT 
     expenses.id,
     expenses.amount,
     expenses.description,
     expenses.created_at,
     categories.name AS category
   FROM expenses
   JOIN categories 
     ON expenses.category_id = categories.id
   WHERE expenses.user_id = $1`,
  [userId]
);
console.log("userId:", userId);

    res.status(200).json({ message: "expense retrieved successfully" , data : expensesRes.rows })
} catch (error) {
    res.status(500).json({ message: "internal server error" , error })
}
}