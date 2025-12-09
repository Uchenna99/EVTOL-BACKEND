"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const webhookService_1 = require("../services/webhookService");
const payment_controller_1 = require("../controllers/payment.controller");
const paymentRouter = express_1.default.Router();
const paymentController = new payment_controller_1.PaymentController();
paymentRouter.post("/initialize", paymentController.initializePayment);
paymentRouter.get("/verify/:reference", paymentController.verifyPayment);
paymentRouter.post("/webhook", webhookService_1.webhook);
exports.default = paymentRouter;
