import crypto from 'crypto';
import { Request, Response } from "express"
import dotenv from "dotenv"
import { db } from '../config/db';
dotenv.config();




export const webhook = async (req: Request, res: Response) => {
    const secret = process.env.PAYSTACK_SECRET_KEY!;
    const hash = crypto.createHmac('sha512', secret).update(req.body).digest('hex');
    const signature = req.headers['x-paystack-signature'];

    if (hash !== signature) {
      res.status(401).send('Invalid signature');
    }

    const event = JSON.parse(req.body.toString());

    if (event.event === 'charge.success') {
      const payment = event.data;
      console.log(payment);
    //   const reference = payment.reference;

    //   try {
    //     // ✅ Update order where reference matches
    //     const updatedOrder = await db.order.update({
    //       where: { reference },
    //       data: {
    //         status: 'COMPLETED',
    //       },
    //     });

    //     console.log('✅ Order updated:', updatedOrder);
    //   } catch (err) {
    //     console.error('Error updating order:', err);
    //   }
    }

    res.sendStatus(200);
}


