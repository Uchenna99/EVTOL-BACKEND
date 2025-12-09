import { NextFunction, Request, Response } from 'express';
import dotenv from "dotenv"
import { PaymentServicesImpl } from '../services/implementation/paymentServices.impl';
import { CreateOrderDTO } from '../dto/createOrder.dto';
dotenv.config();


export class PaymentController {
  paymentServices: PaymentServicesImpl;

  constructor(){
    this.paymentServices = new PaymentServicesImpl();
  }


  public initializePayment = async (req: Request, res: Response, next: NextFunction): Promise<void>=>{
    try {
      const data = req.body as CreateOrderDTO;
      const response = await this.paymentServices.initializePayment(data);
      res.status(200).json(response);
        
    } catch (error) {
        next(error);
    }
  }


  public verifyPayment = async (req: Request, res: Response, next: NextFunction): Promise<void>=>{
    try {
      const reference = req.params.reference;
      const response = await this.paymentServices.verifyPayment(reference);
      res.status(200).json(response);
        
    } catch (error) {
        next(error);
    }
  }

}


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
