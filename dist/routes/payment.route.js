"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const payment_controller_1 = require("../controllers/payment.controller");
const webhookService_1 = require("../services/webhookService");
const paymentRouter = express_1.default.Router();
paymentRouter.post("/initialize-paystack", payment_controller_1.initializeTransaction);
paymentRouter.post("/webhook", webhookService_1.webhook);
exports.default = paymentRouter;
