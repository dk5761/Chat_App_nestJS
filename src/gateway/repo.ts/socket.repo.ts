import { PrismaService } from "src/prisma.service";
import ISocketRepository from "../interface/socket.repo";


export default class SocketRepository implements ISocketRepository {

    constructor(
        private prisma: PrismaService
    ) { }

    async getTheSocketId(userId: string) {

        return await this.prisma.sockets.findUnique({
            where: {
                userId
            }
        });

    }

    async createOrUpdateTheUserSocketInformation(userId: string, socketId: string, isActive: boolean,) {
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