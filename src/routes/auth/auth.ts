import express from "express";
import { AuthController } from "../../controllers/authController/authController";
import { userModel } from "../../models/userModel";
import { UserRepository } from "../../repository/userRepository";
import { AuthService } from "../../services/authService";
const authRouter = express.Router();

const userRepository = new UserRepository(userModel);

const authService = new AuthService(userRepository);

const authController = new AuthController(authService);


authRouter.get("/auth/google", authController.auth.bind(authController));
authRouter.get("/auth/google/callback", authController.googleAuth.bind(authController));

export { authRouter };
