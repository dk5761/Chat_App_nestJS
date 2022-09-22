import { Injectable } from '@nestjs/common';
import { SocketRepository } from './repo/socket.repo';

@Injectable()
export class SocketService {
    constructor(private socketRepo: SocketRepository) { }

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
