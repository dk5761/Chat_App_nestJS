import { IsEmail, IsNotEmpty, IsBoolean } from 'class-validator';

export class UserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    username: string;

    @IsBoolean()
    is_admin: boolean;

    authToken?: string;

    responseToken?: string;


    profile?: {
        avatar_url: string;

        name: string;
    }

}

