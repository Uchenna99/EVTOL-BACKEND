import { jsx as _jsx } from "react/jsx-runtime";
import { PortfolioEmail } from "../../EmailService";
import EmailService from "../../EmailService/EmailService";
const emailService = new EmailService();
export class PortfolioServicesImpl {
    async sendMessage(data) {
        const template = _jsx(PortfolioEmail, { name: data.name, message: data.message, email: data.email });
        const response = await emailService.sendEmail("ucheagbu@yahoo.com", "From portfolio page", template);
        return response;
    }
}
