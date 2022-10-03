import { IsNotEmpty } from 'class-validator';

export class ConversationDTO {
    @IsNotEmpty()

    user1: string;

    @IsNotEmpty()
    user2: string;




}
