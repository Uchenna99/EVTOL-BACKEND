"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioController = void 0;
const portfolioService_impl_1 = require("../services/implementation/portfolioService.impl");
class PortfolioController {
    constructor() {
        this.sendMessage = async (req, res, next) => {
            try {
                const data = req.body;
                const result = await this.portfolioServices.sendMessage(data);
                res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        };
        this.portfolioServices = new portfolioService_impl_1.PortfolioServicesImpl();
    }
}
exports.PortfolioController = PortfolioController;
