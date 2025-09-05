import { sendMessageDTO } from "../dto/SendMessage";
import { EmailResponse } from "../EmailService";



export interface PortfolioServices {
    sendMessage(data: sendMessageDTO): Promise<EmailResponse>;
}