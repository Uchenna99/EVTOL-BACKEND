"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentServicesImpl = void 0;
const crypto_1 = __importDefault(require("crypto"));
const db_1 = require("../../config/db");
const axios_1 = __importDefault(require("axios"));
const client_1 = require("@prisma/client");
const CustomError_1 = require("../../utils/CustomError");
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_BASE_URL = "https://api.paystack.co";
class PaymentServicesImpl {
    async generateReference() {
        const reference = `EVTOL_${crypto_1.default.randomBytes(10).toString("hex")}`;
        return reference;
    }
    async initializePayment(data) {
        // Generate reference
        const reference = `EVTOL_${crypto_1.default.randomBytes(10).toString("hex")}`;
        if (!reference) {
            throw new CustomError_1.CustomError(400, "Failed to generate reference");
        }
        // Create order
        const order = await db_1.db.deliveryOrder.create({
            data: {
                reference,
                userId: data.userId,
                destination: data.destination,
                orderItem: {
                    create: data.items.map(item => ({
                        supplyId: item.id,
                        name: item.name,
                        weight: item.weight,
                        price: item.price
                    }))
                }
            }
        });
        // Initialize paystack
        const response = await axios_1.default.post(`${PAYSTACK_BASE_URL}/transaction/initialize`, {
            email: data.email,
            amount: data.amount * 100, // change to kobo
            reference
        }, {
            headers: {
                Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
                "Content-Type": "application/json"
            }
        });
        return {
            authorization_url: response.data.data.authorization_url,
            access_code: response.data.data.access_code,
            reference: response.data.data.reference,
            order
        };
    }
    async verifyPayment(reference) {
        const response = await axios_1.default.get(`${PAYSTACK_BASE_URL}/transaction/verify/${reference}`, {
            headers: {
                Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`
            }
        });
        const status = response.data.data.status;
        // Process order based on status == "success"
        const order = await db_1.db.deliveryOrder.findUnique({ where: { reference } });
        if (!order) {
            throw new CustomError_1.CustomError(404, "Order not found");
        }
        if (status !== "success") {
            await db_1.db.deliveryOrder.update({
                where: { reference },
                data: {
                    paymentStatus: client_1.PaymentStatus.FAILED
                }
            });
        }
        await db_1.db.deliveryOrder.update({
            where: { reference },
            data: {
                paymentStatus: client_1.PaymentStatus.SUCCESSFUL
            }
        });
        return { status, data: response.data.data };
    }
}
exports.PaymentServicesImpl = PaymentServicesImpl;
