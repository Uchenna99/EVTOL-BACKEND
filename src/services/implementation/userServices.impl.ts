import { User } from "@prisma/client";
import { CreatUserDTO } from "../../dto/CreatUser.dto";
import { UserServices } from "../userServices";
import { db } from "../../config/db";
import { hashPassword } from "../../utils/password.utils";


export class UserServicesImpl implements UserServices{
    
    async createUser(data: CreatUserDTO): Promise<User> {
        const findUser = await db.user.findUnique({
            where: {email: data.email}
        });
        if(findUser){
            throw new Error('Sorry, this email has already been used')
        }else{
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
            return newUser;
        }
    }

    
    async getUserById(id: number): Promise<User> {
        const findUser = await db.user.findFirst({
            where: {id}
        });
        if(!findUser){
            throw new Error(`User with id: ${id} not found`);
        }else{
            return findUser;
        }
    }


    async updateUser(id: number, data: Partial<CreatUserDTO>): Promise<User> {
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


    async deleteUser(id: number): Promise<void> {
        await db.user.delete({
            where: {id}
        });
    }
    
}