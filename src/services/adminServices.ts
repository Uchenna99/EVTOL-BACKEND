import { Order } from "@prisma/client";


export interface AdminServices {
    getAllOrders (): Promise<Order[]>;
}