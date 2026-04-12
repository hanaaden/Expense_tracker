import {Request , Response} from "express"
import { pool } from "../config/db";
import { CustomRequest } from "../types/costumRequest";

export const updateExpense = async (req : CustomRequest , res : Response) => {
    const userId = req.user?.id
    const expenseId = req.params.id
    const {amount , description , category} = req.body
    try {
        const result = await pool.query("UPDATE expenses SET amount = $1 , description = $2 , category_id = $3 WHERE id = $4 AND user_id = $5 RETURNING *" , [amount , description , category , expenseId , userId])
        if(result.rowCount === 0){
            return res.status(404).json({ message: "expense not found" })
        }
        res.status(200).json({ message: "expense updated successfully" , data : result.rows[0] })
    } catch (error) {
        res.status(500).json({ message: "internal server error" , error })
    }
}