import { Router } from "express";
import { deleteExpense } from "../controllers/deleteExpense.controller";
import { authMiddleware } from "../middlewares/Auth.middleware";

const router = Router()
router.delete("/deleteexpense/:id" ,authMiddleware, deleteExpense)

export default router