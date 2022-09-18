import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { IUserRepository } from "../interfaces/user.repo";
import { User } from '@internal/prisma/client';
import { CreateUserParams } from "src/utils/types";


@Injectable()
export class UserRepository implements IUserRepository {

    constructor(
        private prisma: PrismaService
    ) { }


    async createUser(userData: CreateUserParams) {
        return await this.prisma.user.create({
            data: {
                email: userData.email,
                password: userData.password,
                is_admin: userData.is_admin,
                username: userData.username,
                profile: {
                    create: {
                        name: userData.name,
                        avatar_url: userData.avatar_url
                    }
                }
            },
            include: {
                profile: true
            }
        })
    }

    async findById(id: string) {
        return await this.prisma.user.findFirst({
            where: {
                id
            },
            include: {
                profile: true
            }
        });
    }

    async findOne(query: Object) {
        return await this.prisma.user.findFirst({
            where: query,
            include: {
                profile: true
            }
        });
    }

    async findByUsername(username: string) {
        return await this.prisma.user.findMany({
            where: {
                username
            },
            include: {
                profile: true
            }
        });
    }

    async update(id: string, data: Partial<User>) {
        return await this.prisma.user.update({
            where: { id },
            data,

        });
    }

    async delete(id: string) {
        const deleteProfile = this.prisma.profile.delete({
            where: {

            }
        })

        const deleteUser = this.prisma.user.delete({
            where: { id },

        });

        return await this.prisma.$transaction([deleteProfile, deleteUser])
    }


}