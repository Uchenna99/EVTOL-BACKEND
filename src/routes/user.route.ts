import express from "express"
import { UserController } from "../controllers/user.controller";


const userController = new UserController();
const userRouter = express.Router();

userRouter.post('/create-user', userController.createUser);

userRouter.get('/get-user/:id', userController.getUser);

userRouter.get('/fetch-meds', userController.getMeds);

userRouter.post('/create-order', userController.createOrder);



export default userRouter;