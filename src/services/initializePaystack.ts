import axios from 'axios';
import { Request, Response } from 'express';
const secretKey = "sk_test_837fb861720009a8f9d6be73b09b678d720235e2"

export const initializeTransaction = async (req:Request, res:Response) => {
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
          Authorization: `Bearer ${secretKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Paystack init failed' });
  }
};
