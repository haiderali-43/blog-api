import express from "express";
import {
  login,
  register,
  renderLogin,
  renderRegister,
} from "../controllers/authController.js";

const userRouter = express.Router();

userRouter.post("/login", login);

// user register logic
userRouter.post("/register", register);

//render login page
userRouter.get("/login", renderLogin);
// render register page
userRouter.get("/register", renderRegister);

export default userRouter;
