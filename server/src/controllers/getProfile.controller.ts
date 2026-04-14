import { pool } from "../config/db";
import { CustomRequest } from "../types/costumRequest";
import { Response } from "express";

export const getProfile = async (req : CustomRequest , res : Response) => {
  const userId = req.user?.id
    try {
        const user = await pool.query("SELECT  email FROM users WHERE id = $1" , [userId])
        res.status(200).json({ user: user.rows[0] })
    } catch (error) {
        res.status(500).json({ message: "internal server error" , error })
    }
}