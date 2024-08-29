import express from "express";
import { getUserProfile } from "../controllers/userController.js";
import { isAuthenicated } from "../middlewares/auth.js";

const router = express.Router();

router.get('/profile', isAuthenicated, getUserProfile)

export default router;