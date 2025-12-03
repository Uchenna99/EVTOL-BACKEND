import { PortfolioServicesImpl } from "../services/implementation/portfolioService.impl";
export class PortfolioController {
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
        this.portfolioServices = new PortfolioServicesImpl();
    }
}
