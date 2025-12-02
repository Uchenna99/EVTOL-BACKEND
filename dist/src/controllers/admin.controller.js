"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const adminServices_impl_1 = require("../services/implementation/adminServices.impl");
class AdminController {
    constructor() {
        this.getAllOrders = async (req, res, next) => {
            try {
                const orders = await this.adminServices.getAllOrders();
                res.status(200).json(orders);
            }
            catch (error) {
                next(error);
            }
        };
        this.adminServices = new adminServices_impl_1.AdminServicesImpl();
    }
}
exports.AdminController = AdminController;
