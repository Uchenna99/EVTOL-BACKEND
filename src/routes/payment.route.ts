import express from "express"
import { initializeTransaction } from "../controllers/payment.controller";

const paymentRouter = express.Router();

paymentRouter.post("/initialize-paystack", initializeTransaction);


export default paymentRouter;