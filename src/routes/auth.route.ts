import express from "express"
import { AuthController } from "../controllers/auth.controller";


const authController = new AuthController();
const authRouter = express.Router();


authRouter.post('/login', authController.login);

authRouter.post('/verify-email', authController.verifyEmail);



export default authRouter;
