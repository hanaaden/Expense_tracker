import { Router } from "express";
import { authMiddleware } from "../middlewares/Auth.middleware";
import { addExpense } from "../controllers/AddExpenses.controller";

const router = Router()

router.post("/addexpense" , authMiddleware , addExpense)

export default router