import { AdminServicesImpl } from "../services/implementation/adminServices.impl";
export class AdminController {
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
        this.adminServices = new AdminServicesImpl();
    }
}
