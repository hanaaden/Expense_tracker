import { Router } from "express";
import { getExpense } from "../controllers/getExpenses.controller";

const router = Router()

router.get("/expenses" , getExpense)

export default router