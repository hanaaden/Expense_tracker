import { Request , Response } from "express";
import  {pool} from "../config/db";
import { CustomRequest } from "../types/costumRequest";

export const deleteExpense = async (req : CustomRequest , res : Response) => {
    const userId = req.user?.id
    const expenseId = req.params.id
    try {
        await pool.query("DELETE FROM expenses WHERE id = $1 AND user_id = $2" , [expenseId , userId])
        res.status(200).json({ message: "expense deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: "internal server error" , error })
    }
}