"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminServicesImpl = void 0;
const db_1 = require("../../config/db");
class AdminServicesImpl {
    async getAllOrders() {
        const orders = await db_1.db.order.findMany({
            include: { loads: true }
        });
        return orders;
    }
}
exports.AdminServicesImpl = AdminServicesImpl;
