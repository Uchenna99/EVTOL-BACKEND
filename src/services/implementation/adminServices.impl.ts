import { DeliveryOrder } from "@prisma/client";
import { AdminServices } from "../adminServices";
import { db } from "../../config/db";


export class AdminServicesImpl implements AdminServices{

    async getAllOrders(): Promise<DeliveryOrder[]> {
        const orders = await db.deliveryOrder.findMany({
            include: {OrderItem: true}
        })
        return orders;
    }

}