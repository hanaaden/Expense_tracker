import { Request , Response } from "express";
import Jwt  from "jsonwebtoken";
import { CustomRequest } from "../types/costumRequest";

export const authMiddleware = (req : CustomRequest , res : Response , next : Function) => {
   const token = req.cookies?.token
    if(!token){
        return res.status(401).json({ message: "unauthorized" })
    }
    try {
        const decoded = Jwt.verify(token , process.env.JWT_SECRET as string) as { id: number }
        req.user = { id: decoded.id }
        next()
    } catch (error) {
        return res.status(401).json({ message: "unauthorized" })
    }
}