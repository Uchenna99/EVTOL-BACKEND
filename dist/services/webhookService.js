import crypto from 'crypto';
import dotenv from "dotenv";
dotenv.config();
export const webhook = async (req, res) => {
    const secret = process.env.PAYSTACK_SECRET_KEY;
    const hash = crypto.createHmac('sha512', secret).update(JSON.stringify(req.body)).digest('hex');
    const signature = req.headers['x-paystack-signature'];
    if (hash !== signature) {
        res.status(401).send('Invalid signature');
    }
    const event = JSON.parse(JSON.stringify(req.body));
    if (event.event === 'charge.success') {
        const payment = event.data;
        console.log("Event info", payment);
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
    res.status(200).send('Webhook received');
};
