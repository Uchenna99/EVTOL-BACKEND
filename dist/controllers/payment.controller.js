"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const paymentServices_impl_1 = require("../services/implementation/paymentServices.impl");
dotenv_1.default.config();
class PaymentController {
    constructor() {
        this.initializePayment = async (req, res, next) => {
            try {
                const data = req.body;
                const response = await this.paymentServices.initializePayment(data);
                res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        };
        this.verifyPayment = async (req, res, next) => {
            try {
                const reference = req.params.reference;
                const response = await this.paymentServices.verifyPayment(reference);
                res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        };
        this.paymentServices = new paymentServices_impl_1.PaymentServicesImpl();
    }
}
exports.PaymentController = PaymentController;
// export const initializeTransaction = async (req: Request, res: Response) => {
//   try {
//     const { email, amount } = req.body;
//     const response = await axios.post(
//       'https://api.paystack.co/transaction/initialize',
//       {
//         email,
//         amount: amount * 100,
//         metadata: { custom_fields: [{ display_name: 'Delivery Type', value: 'Drone Express' }] },
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
//           'Content-Type': 'application/json',
//         },
//       }
//     );
//     res.status(200).json(response.data);
//   } catch (err) {
//     res.status(500).json({ error: 'Paystack init failed' });
//   }
// };
