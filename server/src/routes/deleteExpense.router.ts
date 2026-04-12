import { Router } from "express";
import { deleteExpense } from "../controllers/deleteExpense.controller";

const router = Router()
router.delete("/deleteexpense/:id" , deleteExpense)

export default router