import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({ usernameField: 'email' });
    }

    private logger: Logger = new Logger('Local Statergy');


    async validate(email: string, password: string): Promise<any> {

        const user = await this.authService.validateUser(email, password);
        this.logger.debug(user)
        return user;
    }
}