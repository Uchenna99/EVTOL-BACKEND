import React from "react";
import { sendMessageDTO } from "../../dto/SendMessage";
import { EmailResponse, PortfolioEmail } from "../../EmailService";
import { PortfolioServices } from "../portfolioService";
import EmailService from "../../EmailService/EmailService";


const emailService = new EmailService();

export class PortfolioServicesImpl implements PortfolioServices {

    async sendMessage(data: sendMessageDTO): Promise<any> {
        const template = <PortfolioEmail name={data.name} message={data.message} />;
        const response: EmailResponse = await emailService.sendEmail("ucheagbu@yahoo.com", "From your portfolio page", template);

        if (response.success) {
            return { success: true };
        } else {
           return { success: false };
        }
    }
    
}