import { User } from "@prisma/client";
import { CreatUserDTO } from "../dto/CreatUser.dto";


export interface UserServices {
    createUser(data: CreatUserDTO): Promise<void>;
    getUserById(id: number): Promise<User>;
    updateUser(id: number, data: Partial<CreatUserDTO>): Promise<User>;
    deleteUser(id: number): Promise<void>;
}