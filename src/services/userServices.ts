import { Medications, Order, User } from "@prisma/client";
import { CreatUserDTO } from "../dto/CreatUser.dto";
import { CreateOrderDTO } from "../dto/createOrder.dto";


export interface UserServices {
    createUser(data: CreatUserDTO): Promise<User>;
    getUserById(id: string): Promise<Partial<User>>;
    updateUser(id: string, data: Partial<CreatUserDTO>): Promise<User>;
    deleteUser(id: string): Promise<void>;
    createOrder(data: CreateOrderDTO): Promise<Order>;
    getUserOrders(id: string): Promise<Order[]>;
    getAllMeds(): Promise<Medications[]>;
}