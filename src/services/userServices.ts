import { Medications, Order, User } from "@prisma/client";
import { CreatUserDTO } from "../dto/CreatUser.dto";
import { CreateOrderDTO } from "../dto/createOrder.dto";


export interface UserServices {
    createUser(data: CreatUserDTO): Promise<User>;
    getUserById(id: number): Promise<User>;
    updateUser(id: number, data: Partial<CreatUserDTO>): Promise<User>;
    deleteUser(id: number): Promise<void>;
    createOrder(data: CreateOrderDTO): Promise<Order>;
    getAllMeds(): Promise<Medications[]>;
}