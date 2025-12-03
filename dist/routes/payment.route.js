import express from "express";
import { initializeTransaction } from "../controllers/payment.controller";
import { webhook } from "../services/webhookService";
const paymentRouter = express.Router();
paymentRouter.post("/initialize-paystack", initializeTransaction);
paymentRouter.post("/webhook", webhook);
export default paymentRouter;
