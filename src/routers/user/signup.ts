import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../../errors";
import { validateRequest } from "../../middlewares";

import { User } from "../../models";
import { signInSchema } from "../../validations";

const router = express.Router();

router.post(
  "/api/users/signup",
  validateRequest(signInSchema),
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email in use");
    }

    const user = User.build({ email, password });
    await user.save();

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
