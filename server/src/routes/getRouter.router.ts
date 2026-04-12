import { Router } from "express";
import { getExpense } from "../controllers/getExpenses.controller";
import { authMiddleware } from "../middlewares/Auth.middleware";

const router = Router()

router.get("/expenses" , authMiddleware,getExpense)

export default router