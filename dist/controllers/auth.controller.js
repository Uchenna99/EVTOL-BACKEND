import { AuthServicesImpl } from "../services/implementation/authServices.impl";
export class AuthController {
    constructor() {
        this.login = async (req, res, next) => {
            try {
                const data = req.body;
                const token = await this.authServices.login(data);
                res.status(200).json(token);
            }
            catch (error) {
                next(error);
            }
        };
        this.verifyEmail = async (req, res, next) => {
            try {
                const data = req.body;
                const response = await this.authServices.verifyEmail(data);
                res.status(200).json({ response, message: 'Email verified successfully' });
            }
            catch (error) {
                next(error);
            }
        };
        this.authServices = new AuthServicesImpl();
    }
}
