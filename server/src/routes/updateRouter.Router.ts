import { Router } from "express";
import { updateExpense } from "../controllers/updateExpenses.controller";
import { authMiddleware } from "../middlewares/Auth.middleware";
const router = Router()

router.put("/updateexpense/:id" ,authMiddleware, updateExpense)

export default router