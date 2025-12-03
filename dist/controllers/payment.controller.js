"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeTransaction = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const initializeTransaction = async (req, res) => {
    try {
        const { email, amount } = req.body;
        const response = await axios_1.default.post('https://api.paystack.co/transaction/initialize', {
            email,
            amount: amount * 100,
            metadata: { custom_fields: [{ display_name: 'Delivery Type', value: 'Drone Express' }] },
        }, {
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                'Content-Type': 'application/json',
            },
        });
        res.status(200).json(response.data);
    }
    catch (err) {
        res.status(500).json({ error: 'Paystack init failed' });
    }
};
exports.initializeTransaction = initializeTransaction;
