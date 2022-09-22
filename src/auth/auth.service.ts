import { BadRequestException, ConflictException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserParams } from 'src/utils/types';
import { User, Profile } from '@internal/prisma/client';


@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    private logger: Logger = new Logger('Auth Service');


    async validateUser(email: string, password: string): Promise<any> {
        try {
            // retrieve the user from the db
            const user: User & { profile: Profile } = await this.userService.getUserByEmail(email);

            // check the provided password
            const match = await bcrypt.compare(password, user.password);

            if (match) {
                // remove the password and old auth token from the user object.

                // return the user object 
                return user;
            }

            return null;
        } catch (err) {
            this.logger.error(err);
        }
    }

    async login(user: any) {

        try {
            const { password, authToken, ...result } = user;
            // generate new token
            const token = await this.jwtService.sign({
                id: user.id,
                email: user.email,
                username: user.username
            });

            // add the token to db
            await this.userService.updateUser(user.id, { authToken: token })

            // return the user with token
            return {
                ...result,
                authToken: token
            };
        } catch (err) {
            this.logger.error(err);
        }
    }


    async register(userData: CreateUserParams) {

        // check if the email provided exist?
        const user = await this.userService.getUserByEmail(userData.email);
        if (user) {
            throw new ConflictException("User exist")
        }

        // hash the password.
        const hashed = await bcrypt.hash(userData.password, 9);

        // save the user to db
        const newUser = await this.userService.createUser(
            {
                email: userData.email,
                password: hashed,
                username: userData.username,
                is_admin: userData.is_admin,
                avatar_url: userData.avatar_url,
                name: userData.name
            }
        );

        // log the user in
        return this.login(newUser);
    }

    async loginOrRegister(userData: CreateUserParams) {

        // check if the email provided exist?
        const isUser = await this.userService.getUserByEmail(userData.email);
        if (isUser) {
            const user = await this.validateUser(userData.email, userData.password);
            return this.login(user);
        }

        // hash the password.
        const hashed = await bcrypt.hash(userData.password, 9);

        // save the user to db
        const newUser = await this.userService.createUser(
            {
                email: userData.email,
                password: hashed,
                username: userData.username,
                is_admin: userData.is_admin,
                avatar_url: userData.avatar_url,
                name: userData.name
            }
        );

        // log the user in
        return this.login(newUser);
    }

    async verify(token) {
        try {
            return await this.jwtService.verify(token, { secret: 'asdasdasdasd' });
        } catch (e: any) {
            console.log('error in verify function :  ', e);
        }
    }
}
