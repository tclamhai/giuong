import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../../errors";
import { validateRequest } from "../../middlewares";

import { Password } from "../../services/password";
import { User } from "../../models";
import { signInSchema } from "../../validations";

const router = express.Router();

router.post(
  "/api/users/signin",
  validateRequest(signInSchema),
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("Invalid credentials");
    }

    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );
    if (!passwordsMatch) {
      throw new BadRequestError("Invalid Credentials");
    }

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
