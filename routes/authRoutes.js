import express from "express";
import {
  login,
  logout,
  register,
} from "../controllers/authController.js";

const userRouter = express.Router();

userRouter.post("/login", login);

// user register logic
userRouter.post("/register", register);



userRouter.post('/logout',logout); 

export default userRouter;
