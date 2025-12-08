"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhook = void 0;
const crypto_1 = __importDefault(require("crypto"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("../config/db");
dotenv_1.default.config();
const webhook = async (req, res) => {
    const secret = process.env.PAYSTACK_SECRET_KEY;
    const hash = crypto_1.default.createHmac('sha512', secret).update(JSON.stringify(req.body)).digest('hex');
    const signature = req.headers['x-paystack-signature'];
    if (hash !== signature) {
        res.status(401).send('Invalid signature');
    }
    const event = JSON.parse(JSON.stringify(req.body));
    if (event.event === 'charge.success') {
        const payment = event.data;
        console.log("Event info", payment);
        const reference = payment.reference;
        try {
            // ✅ Update order where reference matches
            const updatedOrder = await db_1.db.deliveryOrder.update({
                where: { reference },
                data: {
                    paymentStatus: 'SUCCESSFUL',
                },
            });
            console.log('✅ Order updated:', updatedOrder);
        }
        catch (err) {
            console.error('Error updating order:', err);
        }
    }
    res.status(200).send('Webhook received');
};
exports.webhook = webhook;
