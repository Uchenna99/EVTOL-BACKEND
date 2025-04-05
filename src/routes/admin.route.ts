import express from "express"
import { AdminController } from "../controllers/admin.controller";


const adminRouter = express.Router();
const adminController = new AdminController();

adminRouter.get("/get-orders", adminController.getAllOrders);

export default adminRouter;