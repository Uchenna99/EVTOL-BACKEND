import { DeliveryOrder } from "@prisma/client";
import { CreateOrderDTO } from "../dto/createOrder.dto";



export interface PaymentServices {
    generateReference (): Promise<string>;
    initializePayment (data: CreateOrderDTO): Promise<{authorization_url:string, access_code:any, reference: string, order: DeliveryOrder}>;
    verifyPayment (reference: string): Promise<any>;
}