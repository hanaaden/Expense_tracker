import { Request , Response } from "express";
import {pool} from "../config/db";
import { CustomRequest } from "../types/costumRequest";
export const getExpense = async (req : CustomRequest , res : Response)=>{
    const userId = req.user?.id
try {

    const expensesRes = await pool.query(
  "SELECT * FROM expenses WHERE user_id = $1",
  [userId]
);

    res.status(200).json({ message: "expense retrieved successfully" , data : expensesRes.rows })
} catch (error) {
    res.status(500).json({ message: "internal server error" , error })
}
}