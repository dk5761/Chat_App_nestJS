import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import ISocketRepository from "../interface/socket.repo";

@Injectable()
export class SocketRepository implements ISocketRepository {

    constructor(
        private prisma: PrismaService
    ) { }

    async getTheSocketId(userId: string) {
        console.log(userId)
        return await this.prisma.sockets.findFirst({
            where: {
                userId
            }
        });

    }

    async createOrUpdateTheUserSocketInformation(userId: string, socketId: string, isActive: boolean) {

        return await this.prisma.sockets.upsert({
            where: {
                userId
            },
            update: {
                socketId,
                isActive
            },
            create: {
                userId,
                socketId,
                isActive
            }
        })
    }

}

