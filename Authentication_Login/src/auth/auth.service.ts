import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { use } from 'passport';
import { UsersService } from 'src/users/users.service';

import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async register({name, lastname, email, password}: any) {
        const user = await this.usersService.getUserValidation(email);

        if (user) {
            throw new BadRequestException('User already exists');
        }

        return await this.usersService.createUser({
            name,
            lastname,
            email, 
            password: bcryptjs.hashSync(password, 10)
        });
    }

    async login({email, password}: any) {
        const user = await this.usersService.getUserValidation(email);
        console.log(user.id);
        if (!user){
            throw new UnauthorizedException('Email is incorrect');
        }
        
        const passwordValid = await bcryptjs.compare(password, user.password);

        if (!passwordValid){
            throw new UnauthorizedException('Password is incorrect');
        }

        const payload = {
            email: user.email,
            name: user.name,
            lastname: user.lastname, 
            sub: user.id
        };

        const token = await this.jwtService.signAsync(payload);

        return {
            access_token: token,
            user: user
        };
    }
}
