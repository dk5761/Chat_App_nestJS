import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserRepository } from './repo/user.repo';

import { User } from '@internal/prisma/client';
import { CreateUserParams } from 'src/utils/types';


@Injectable()
export class UserService {
    constructor(private readonly userRepo: UserRepository) { }

    async getUserById(id: string) {
        const user = await this.userRepo.findById(id);

        if (user) {
            const { password, ...rest } = user;
            return rest;
        }
    }

    async getUserByEmail(email: string) {
        return await this.userRepo.findOne({ email });

    }

    async getUserByUsername(username: string) {
        const user = await this.userRepo.findByUsername(username);
        // console.log(user);
        return user;
    }

    async createUser(
        userData: CreateUserParams

    ): Promise<User> {
        return await this.userRepo.createUser(userData);
    }

    async updateUser(id: string, data: Partial<UserDto>) {
        return await this.userRepo.update(id, data);
    }

    async deleteUser(id: string) {
        return await this.userRepo.delete(id);
    }


}
