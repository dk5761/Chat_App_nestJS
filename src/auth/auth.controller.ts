import { Body, Controller, HttpStatus, Logger, Post, Req, Request, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { UserDto } from 'src/user/dto/user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    private logger: Logger = new Logger('Auth Controller');

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req: any, @Res() res: Response) {
        this.logger.log('Logged IN User: ', req.user.email);
        return res
            .status(HttpStatus.OK)
            .send(await this.authService.login(req.user));
    }

    @Post('/loginOrRegister')
    async loginOrRegister(@Body() body: UserDto) {



        var profile: {
            name: string,
            avatar_url: string
        } = {
            name: "",
            avatar_url: ""
        };

        //check if profile is provided while creating the user.
        if (body.profile) {
            profile = {
                name: body.profile.name,
                avatar_url: body.profile.avatar_url
            }
        }

        // create a new user.
        const user = await this.authService.loginOrRegister(
            {
                email: body.email,
                password: body.password,
                name: profile.name,
                is_admin: body.is_admin,
                avatar_url: profile.avatar_url,
                username: body.username
            }
        );

        this.logger.log("logged in as : ", user.email);
        //return the user
        return user;

    }


    @Post('/register')
    async register(@Body() body: UserDto) {


        var profile: {
            name: string,
            avatar_url: string
        } = {
            name: "",
            avatar_url: ""
        };

        //check if profile is provided while creating the user.
        if (body.profile) {
            profile = {
                name: body.profile.name,
                avatar_url: body.profile.avatar_url
            }
        }



        // create a new user.
        const user = await this.authService.register(
            {
                email: body.email,
                password: body.password,
                name: profile.name,
                is_admin: body.is_admin,
                avatar_url: profile.avatar_url,
                username: body.username
            }
        );

        //return the user
        return user;

    }

    @Post('resetPassword')
    async resetPassword() { }
}
