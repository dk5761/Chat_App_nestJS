import { Controller } from '@nestjs/common';
import { SocketService } from './socket.service';

@Controller('socket')
export class SocketController {
    constructor(
        private socketService: SocketService
    ) { }
}
