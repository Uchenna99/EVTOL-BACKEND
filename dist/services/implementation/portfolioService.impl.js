"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioServicesImpl = void 0;
const react_1 = __importDefault(require("react"));
const EmailService_1 = require("../../EmailService");
const EmailService_2 = __importDefault(require("../../EmailService/EmailService"));
const emailService = new EmailService_2.default();
class PortfolioServicesImpl {
    async sendMessage(data) {
        const template = react_1.default.createElement(EmailService_1.PortfolioEmail, { name: data.name, message: data.message, email: data.email });
        const response = await emailService.sendEmail("ucheagbu@yahoo.com", "From portfolio page", template);
        return response;
    }
}
exports.PortfolioServicesImpl = PortfolioServicesImpl;
