import { Request , Response } from "express";
import { pool } from "../config/db";

export const getCategories = async (req : Request , res : Response) => {

try {
    const categories = await pool.query("SELECT * FROM categories")

    res.status(200).json({ message: "categories retrieved successfully" , data : categories.rows })
} catch (error) {
    res.status(500).json({ message: "internal server error" , error })
}


}