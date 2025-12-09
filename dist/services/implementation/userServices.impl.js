"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServicesImpl = void 0;
const db_1 = require("../../config/db");
const password_utils_1 = require("../../utils/password.utils");
const otp_utils_1 = require("../../utils/otp.utils");
const EmailService_1 = __importDefault(require("../../EmailService/EmailService"));
const CustomError_1 = require("../../utils/CustomError");
const emailService = new EmailService_1.default();
class UserServicesImpl {
    async createUser(data) {
        const findUser = await db_1.db.user.findUnique({
            where: { email: data.email }
        });
        if (findUser) {
            throw new CustomError_1.CustomError(409, 'Sorry, this email has already been used');
        }
        const otp = (0, otp_utils_1.generateOtp)();
        const newUser = await db_1.db.user.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                age: data.age,
                phoneNumber: data.phoneNumber,
                email: data.email,
                occupation: data.occupation,
                password: await (0, password_utils_1.hashPassword)(data.password)
            }
        });
        // await sendOtpEmail({
        //     to: data.email,
        //     subject: "Verify your email",
        //     otp: otp,
        // })
        // .then(async ()=>{
        //     await db.user.update({
        //         where: {email: data.email},
        //         data: {
        //             otp: await hashPassword(otp),
        //             otpExpiry: this.generateOtpExpiration()
        //         }
        //     })
        // })
        // .catch((error)=> {throw new Error(error)})
        // const template = <OtpEmail otp={otp} />;
        // const response: EmailResponse = await emailService.sendEmail(data.email, "Verify your email", template);
        // if (response.success) {
        //     await db.user.update({
        //         where: {email: data.email},
        //         data: {
        //             otp: await hashPassword(otp),
        //             otpExpiry: this.generateOtpExpiration()
        //         }
        //     })
        //     return newUser;
        // } else {
        //     return response;
        // }
        return newUser;
    }
    async getUserById(id) {
        const findUser = await db_1.db.user.findFirst({
            where: { id },
            omit: { password: true, otp: true, otpExpiry: true, createdAt: true, updatedAt: true },
            include: { orderHistory: { include: { orderItem: true } } }
        });
        if (!findUser) {
            throw new CustomError_1.CustomError(404, `User with id: ${id} not found`);
        }
        else {
            return findUser;
        }
    }
    async updateUser(id, data) {
        const findUser = await db_1.db.user.findUnique({
            where: { id }
        });
        if (!findUser) {
            throw new CustomError_1.CustomError(404, `User with id: ${id} not found`);
        }
        else {
            const updatedUser = await db_1.db.user.update({
                where: { id },
                data
            });
            return updatedUser;
        }
    }
    async deleteUser(id) {
        await db_1.db.user.delete({
            where: { id }
        });
    }
    // async createOrder(data: CreateOrderDTO): Promise<DeliveryOrder> {
    //     const newOrder = await db.deliveryOrder.create({
    //         data: {
    //             evtolId: data.evtolId,
    //             userId: data.userId,
    //             reference: data.reference,
    //             destination: data.destination,
    //         },
    //         include: {orderItem: {include: {order: true}}}
    //     });
    //     return newOrder;
    // }
    async getAllMeds() {
        const allMeds = await db_1.db.medicalSupply.findMany({});
        return allMeds;
    }
    async getUserOrders(id) {
        const orders = await db_1.db.deliveryOrder.findMany({
            where: { userId: id },
            include: { orderItem: { include: { order: true } } }
        });
        return orders;
    }
    generateOtpExpiration() {
        return new Date(Date.now() + 10 * 60 * 1000);
    }
}
exports.UserServicesImpl = UserServicesImpl;
