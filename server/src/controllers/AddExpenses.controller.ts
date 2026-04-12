import { Request , Response } from "express";
import {pool} from "../config/db";
import { CustomRequest } from "../types/costumRequest";

export const addExpense = async (req : CustomRequest , res : Response) => {
 try {
      const userId = req.user?.id
    const {amount , description , category} = req.body

   const result = await pool.query("INSERT INTO expenses (user_id , amount , description , category_id) VALUES ($1 , $2 , $3 , $4)" , [userId , amount , description , category])
    
    res.status(201).json({ message: "expense added successfully" , data : result.rows[0] })
 } catch (error) {
    res.status(500).json({ message: "internal server error" , error })
 }
}