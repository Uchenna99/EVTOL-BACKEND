"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const portfolio_controller_1 = require("../controllers/portfolio.controller");
const portfolioController = new portfolio_controller_1.PortfolioController();
const portfolioRouter = express_1.default.Router();
portfolioRouter.post('/send-message', portfolioController.sendMessage);
exports.default = portfolioRouter;
