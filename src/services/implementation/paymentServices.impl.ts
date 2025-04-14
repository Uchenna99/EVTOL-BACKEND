import { PaymentServices } from "../paymentServices";



export class PaymentServicesImpl implements PaymentServices {

    async initializePayment(email: string, amount: number): Promise<string> {
        throw new Error("Method not implemented.");
    }
    
}