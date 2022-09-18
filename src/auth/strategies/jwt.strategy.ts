import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'asdasdasdasd',
        });
    }

    async validate(payload: any): Promise<any> {
        // add/delete values to change the user object
        // console.log(payload.email, payload.sub)
        return {
            id: payload.sub,
            name: payload.email,
        };
    }
}