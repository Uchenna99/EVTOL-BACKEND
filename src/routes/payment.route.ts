import express from "express"
import { webhook } from "../services/webhookService";
import { PaymentController } from "../controllers/payment.controller";

const paymentRouter = express.Router();
const paymentController = new PaymentController();

paymentRouter.post("/initialize", paymentController.initializePayment);

paymentRouter.post("/verify/:reference", paymentController.verifyPayment);

paymentRouter.post("/webhook", webhook);


export default paymentRouter;