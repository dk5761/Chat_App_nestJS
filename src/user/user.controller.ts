import {
    Param,
    Controller,
    Get,
    Post,
    NotFoundException,
    Body,
    Delete,
    Put,
    UseGuards,
    Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@internal/prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guards';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }


    @UseGuards(JwtAuthGuard)
    @Get()
    async getUser(@Request() req: any): Promise<Partial<UserModel>> {
        // console.log(req);
        const user = await this.userService.getUserById(req.user.id);
        if (!user) {
            throw new NotFoundException('user not found');
        }
        return user;
    }

    @Get('ping')
    async ping(@Request() req: any) {
        return { message: 'pinged' };
    }

    //update user profile
    @UseGuards(JwtAuthGuard)
    @Put()
    async update(@Request() req: any, @Body() body: UserDto) {

        console.log('updating called', body, req.user.id);
        const user = await this.userService.updateUser(req.user.id, body);
        const { password, authToken, ...result } = user
        return result
    }

    // //delete user
    @UseGuards(JwtAuthGuard)
    @Delete()
    async deleteUser(@Request() req: any) {
        const user = await this.userService.deleteUser(req.user.id);
        if (!user) {
            throw new NotFoundException('user not found');
        }
        return user;
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:username')
    async getUserByUsername(@Param('username') username: string) {
        // console.log(req);
        const userList = await this.userService.getUserByUsername(username);
        if (userList.length == 0) {
            throw new NotFoundException('user not found');
        }
        // console.log('the user : ', userList);
        return userList;
    }

    @UseGuards(JwtAuthGuard)
    @Get('byID/:id')
    async getUserById(@Param('id') id: string) {
        // console.log(req);
        const user = await this.userService.getUserById(id);
        // console.log('the user : ', userList);
        return user;
    }
}
