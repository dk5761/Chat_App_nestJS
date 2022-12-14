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

import { Socket, Server } from 'socket.io';
import { ChatService } from 'src/chat/chat.service';
import { SocketService } from './socket.service';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})


export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {

    constructor(
        private readonly authService: AuthService,
        private readonly socketService: SocketService,
        private readonly chatService: ChatService
    ) { }


    @WebSocketServer() server;
    private logger: Logger = new Logger('ChatGateway');

    afterInit(server) {
        this.logger.log('Init');
    }

    async handleConnection(client: Socket, data: any[]) {



        if (
            client.handshake.headers.token === 'null' ||
            client.handshake.headers.token === 'undefined'
        ) {
            this.logger.log('the socket is disconnected due to incorrect token');
            return client.disconnect(true);
        }



        const payload = await this.authService.verify(client.handshake.headers.token);


        await this.socketService.createUpdateSocketInformation(payload.id, client.id,);
        // this.server.emit('isOnline', { id: payload.id, isOnline: true })
        this.logger.log(`Client connected: ${client.id}`);
    }

    async handleDisconnect(client: any) {
        this.logger.log(`deleteting socket:  ${client.id} `);
        const payload = await this.authService.verify(client.handshake.headers.token);
        await this.socketService.deleteSocketId(payload.id);
        this.server.emit('isOnline', { id: payload.id, isOnline: false })
    }


    @SubscribeMessage('send_broadcastmessage')
    handleMessage(client: Socket, payload: string): void {
        console.log('the client to server payload :', payload);
        this.server.emit('receive_broadcastmessage', payload);
    }

    @SubscribeMessage('sendMessage')
    async handlePrivateMessage(client: Socket, payload: { author_id, receiver_id, conversationId?, reciever_socket_id?, message }): Promise<void> {

        var conversationId = payload.conversationId;

        if (conversationId == null) {
            const conversation = await this.chatService.getConversationOrCreateConversation(payload.author_id, payload.receiver_id);
            conversationId = conversation.id

            // send the conversation id to the socket author.
            this.server.to(client.id).emit('updatedConversationId', {
                userId: payload.author_id, recieverId: payload.receiver_id, conversationId: conversationId
            })
        }

        // check if the we have the socket id?
        if (!payload.reciever_socket_id) {

            // if not socket id
            // do a db call for getting user information
            const reciever = await this.socketService.getSocketInformation(payload.receiver_id);

            if (reciever.isActive) {
                // if the user is active emit  to the socket id
                await this.chatService.saveMessage(payload.author_id, conversationId, payload.message, null)
                this.server.to(reciever.socketId).emit('receiveMessage', { ...payload, conversationId: conversationId })
            } else {
                // if not active then make a fcm call to the server.
                //FCM call
            }
        } else {
            // if we have the socket id
            // the skip the db call and send it to the user.
            await this.chatService.saveMessage(payload.author_id, conversationId, payload.message, null)
            this.server.to(payload.reciever_socket_id).emit('receiveMessage', { ...payload, conversationId: conversationId });
        }



    }

    @SubscribeMessage('getSocketId')
    async handleSocketId(client: Socket, payload: { receiver_id: string }): Promise<void> {
        const reciever = await this.socketService.getSocketInformation(payload.receiver_id);
        this.server.to(client.id).emit('receiveSocketId', { socketId: reciever.socketId, isOnline: reciever.isActive });
    }


}