import express, { Request, Response } from "express";
import currentUserRouter from "./current-user";
import signupRouter from "./signup";
import signinRouter from "./signin";

const userRouter = express.Router();

userRouter.use(currentUserRouter);
userRouter.use(signupRouter);
userRouter.use(signinRouter);

export default userRouter;
