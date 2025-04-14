import axios from 'axios';
import { Request, Response } from 'express';
import dotenv from "dotenv"
dotenv.config();


export const initializeTransaction = async (req: Request, res: Response) => {
  try {
    const { email, amount } = req.body;

    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email,
        amount: amount * 100,
        metadata: { custom_fields: [{ display_name: 'Delivery Type', value: 'Drone Express' }] },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Paystack init failed' });
  }
};
