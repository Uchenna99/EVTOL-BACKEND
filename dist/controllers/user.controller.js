import { UserServicesImpl } from "../services/implementation/userServices.impl";
export class UserController {
    constructor() {
        this.createUser = async (req, res, next) => {
            try {
                const data = req.body;
                const user = await this.userServices.createUser(data);
                res.status(201).json(user);
            }
            catch (error) {
                next(error);
            }
        };
        this.getUser = async (req, res, next) => {
            try {
                const id = req.params.id;
                const user = await this.userServices.getUserById(id);
                res.status(200).json(user);
            }
            catch (error) {
            }
        };
        this.getMeds = async (req, res, next) => {
            try {
                const allMeds = await this.userServices.getAllMeds();
                res.status(200).json(allMeds);
            }
            catch (error) {
                next(error);
            }
        };
        this.createOrder = async (req, res, next) => {
            try {
                const data = req.body;
                const newOrder = await this.userServices.createOrder(data);
                res.status(201).json(newOrder);
            }
            catch (error) {
                next(error);
            }
        };
        this.getUserOrders = async (req, res, next) => {
            try {
                const id = req.params.id;
                const orders = await this.userServices.getUserOrders(id);
                res.status(200).json(orders);
            }
            catch (error) {
                next(error);
            }
        };
        this.userServices = new UserServicesImpl();
    }
}
