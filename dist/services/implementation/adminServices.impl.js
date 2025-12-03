import { db } from "../../config/db";
export class AdminServicesImpl {
    async getAllOrders() {
        const orders = await db.order.findMany({
            include: { loads: true }
        });
        return orders;
    }
}
