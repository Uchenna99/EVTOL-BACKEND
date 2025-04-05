import { Order } from "@prisma/client";
import { AdminServices } from "../adminServices";
import { db } from "../../config/db";


export class AdminServicesImpl implements AdminServices{

    async getAllOrders(): Promise<Order[]> {
        const orders = await db.order.findMany({
            include: {loads: true}
        })
        return orders;
    }

}