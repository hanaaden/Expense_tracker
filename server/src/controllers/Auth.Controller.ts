import { Request , Response } from "express";
import {pool} from "../config/db";

import { loginSchema , SignupSchema } from "../validations/validation";

import bcrypt from "bcrypt"
import Jwt from "jsonwebtoken";

export const signup = async (req : Request , res : Response) => {
    try {
        const result = await SignupSchema.safeParse(req.body)

        if (!result.success) {
           return res.status(400).json({ message: "invalid input" , errors : result.error.format() })
        }

        const {email , password} = result.data
        const hashed = await bcrypt.hash(password , 10)

        await pool.query("INSERT INTO users (email , password) VALUES ($1 , $2)" , [email , hashed])

        res.status(201).json({ message: "user created successfully" })
    } catch (error) {
        res.status(500).json({ message: "internal server error" , error })  
    }
}

export const login = async (req : Request , res : Response) => {

    const result = await loginSchema.safeParse(req.body)
          if (!result.success) {
           return res.status(400).json({ message: "invalid input" , errors : result.error.format() })
        }
    const {email , password} = result.data

    try{
        const user = await pool.query("SELECT * FROM users WHERE email = $1" , [email])

        if(user.rowCount === 0){
            return res.status(400).json({ message: "invalid email or password" })
        }

        const isValid = await bcrypt.compare(password , user.rows[0].password)

        if(!isValid){
            return res.status(400).json({ message: "invalid email or password" })
        }

        const token = Jwt.sign({ id: user.rows[0].id } , process.env.JWT_SECRET as string , { expiresIn: "2d" })

      res.cookie("token" , token , 
            { httpOnly: true , 
            secure: true,
            sameSite :"none",
            maxAge : 24 * 60 * 60 * 1000 
           })

        res.status(200).json({ message: "logged in successfully" })
    }catch (err) {
        console.log("loginError" , err)
        res.status(500).json({ message: "Error logging in" })
    }
}

export const logout = async (req : Request , res : Response) => {
     res.clearCookie("token"); 
  res.status(200).json({ message: "Logged out" });
}