import express from 'express';
import { PortfolioController } from "../controllers/portfolio.controller";
const portfolioController = new PortfolioController();
const portfolioRouter = express.Router();
portfolioRouter.post('/send-message', portfolioController.sendMessage);
export default portfolioRouter;
