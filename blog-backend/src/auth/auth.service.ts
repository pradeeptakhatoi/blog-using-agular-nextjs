import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private jwtService: JwtService,
        private usersService: UsersService,
    ) { }

    async validateOAuthLogin(profile: any, provider: string): Promise<string> {
        let user = await this.usersService.findByEmail(profile.email);

        if (!user) {
            user = this.usersRepository.create({
                email: profile.email,
                name: profile.name,
                provider,
                providerId: profile.id,
            });
            await this.usersRepository.save(user);
        }

        const payload = { email: user.email, sub: user.id };
        return this.jwtService.sign(payload);
    }

    async validateUser(email: string): Promise<User> {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        return user;
    }
}
