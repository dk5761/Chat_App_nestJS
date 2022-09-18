import { Injectable } from '@nestjs/common';
import SocketRepository from './repo.ts/socket.repo';

@Injectable()
export class SocketService {
    constructor(private readonly socketRepo: SocketRepository) { }

    async getSocketInformation(userId: string) {
        return await this.socketRepo.getTheSocketId(userId);
    }

    async createUpdateSocketInformation(userId: string, socketId: string) {
        return await this.socketRepo.createOrUpdateTheUserSocketInformation(userId, socketId, true);
    }

    async deleteSocketId(userId: string,) {
        return await this.socketRepo.createOrUpdateTheUserSocketInformation(userId, null, false);
    }


}
