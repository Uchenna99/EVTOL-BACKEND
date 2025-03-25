import { Load, Medications, Order, User } from "@prisma/client";
import { CreatUserDTO } from "../../dto/CreatUser.dto";
import { UserServices } from "../userServices";
import { db } from "../../config/db";
import { hashPassword } from "../../utils/password.utils";
import { sendOtpEmail } from "../../otp/email";
import { generateOtp } from "../../utils/otp.utils";
import { CreateOrderDTO } from "../../dto/createOrder.dto";


export class UserServicesImpl implements UserServices{
    
    async createUser(data: CreatUserDTO): Promise<User> {
        const findUser = await db.user.findUnique({
            where: {email: data.email}
        });
        if(findUser){
            throw new Error('Sorry, this email has already been used')
        }else{
            const otp = generateOtp();
            const newUser = await db.user.create({
                data: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    age: data.age,
                    phoneNumber: data.phoneNumber,
                    region: data.region,
                    email: data.email,
                    password: await hashPassword(data.password)
                }
            });
            await sendOtpEmail({
                to: data.email,
                subject: "Verify your email",
                otp: otp,
            })
            .then(async ()=>{
                await db.user.update({
                    where: {email: data.email},
                    data: {
                        otp: await hashPassword(otp),
                        otpExpiry: this.generateOtpExpiration()
                    }
                })
            })
            return newUser;
        }
    }
    
    
    async getUserById(id: string): Promise<User> {
        const findUser = await db.user.findFirst({
            where: {id}
        });
        if(!findUser){
            throw new Error(`User with id: ${id} not found`);
        }else{
            return findUser;
        }
    }
    
    
    async updateUser(id: string, data: Partial<CreatUserDTO>): Promise<User> {
        const findUser = await db.user.findUnique({
            where: {id}
        });
        if(!findUser){
            throw new Error(`User with id: ${id} not found`);
        }else{
            const updatedUser = await db.user.update({
                where: {id},
                data
            });
            return updatedUser;
        }
    }
    
    
    async deleteUser(id: string): Promise<void> {
        await db.user.delete({
            where: {id}
        });
    }
    
    
    async createOrder(userId: string): Promise<Order> {
        const newOrder = await db.order.create({
            data: {userId}
        });
        return newOrder;
    }


    async getAllMeds(): Promise<Medications[]> {
        const allMeds = await db.medications.findMany({});
        return allMeds;
    }
    
    
    generateOtpExpiration() {
        return new Date(Date.now() + 10 * 60 * 1000);
    }
    
}