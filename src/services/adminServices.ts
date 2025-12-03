import { DeliveryOrder } from "@prisma/client";


export interface AdminServices {
    getAllOrders (): Promise<DeliveryOrder[]>;
}