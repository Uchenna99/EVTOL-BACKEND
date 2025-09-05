import { sendMessageDTO } from "../dto/SendMessage";



export interface PortfolioServices {
    sendMessage(data: sendMessageDTO): Promise<any>;
}