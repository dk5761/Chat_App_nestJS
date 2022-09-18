import { Logger } from '@nestjs/common';
import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
} from '@nestjs/websockets';
import { AuthService } from 'src/auth/auth.service';
import { SocketService } from './socket.service'
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})


export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {

    constructor(
        private readonly authService: AuthService,
        private readonly socketService: SocketService,
    ) { }




    @WebSocketServer() server;
    private logger: Logger = new Logger('ChatGateway');

    afterInit(server) {
        this.logger.log('Init');
    }

    users: number = 0;
    async handleConnection(client: Socket, data: any[]) {
        if (
            client.handshake.query.token === 'null' ||
            client.handshake.query.token === 'undefined'
        ) {
            this.logger.log('the socket is disconnected due to incorrect token');
            return client.disconnect(true);
        }
        const payload = await this.authService.verify(client.handshake.query.token);
        const saveSocket = await this.socketService.createUpdateSocketInformation(
            payload.id,
            client.id,

        );

        this.logger.log(`Client connected: ${client.id}`);
        this.logger.log(`payload data connected: ${payload}`);

    }

    async handleDisconnect(client: any) {
        this.logger.log(`deleteting socket:  ${client.id}`);
        const payload = await this.authService.verify(client.handshake.query.token);
        const deleteSocket = await this.socketService.deleteSocketId(
            payload.id);
    }


    @SubscribeMessage('send_broadcastmessage')
    handleMessage(client: Socket, payload: string): void {
        console.log('the client to server payload :', payload);
        this.server.emit('receive_broadcastmessage', payload);
    }

    @SubscribeMessage('sendMessage')
    async handlePrivateMessage(client: Socket, payload: any): Promise<void> {
        console.log('the private message :', payload);
        const reciever = await this.socketService.getSocketInformation(payload.reciever_id);
        // this.server.to(reciever.socketId).emit('receiveMessage', payload);
    }
}