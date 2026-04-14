import { Router } from "express";
import { getProfile } from "../controllers/getProfile.controller";
import { authMiddleware } from "../middlewares/Auth.middleware";
const router = Router()

router.get("/profile" ,authMiddleware ,  getProfile)
export default router
