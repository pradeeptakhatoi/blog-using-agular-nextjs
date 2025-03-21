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
                providerId: profile?.id,
            });
            await this.usersRepository.save(user);
        }

        const payload = { email: user.email, sub: user.id };
        return this.jwtService.sign(payload);
    }

    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        if (user.password !== password) {
            throw new UnauthorizedException('Invalid password');
        }
        return user;
    }

    // ✅ Validate user login
    // async validateUser(email: string, password: string) {
    //     const user = await this.usersService.findByEmail(email);
    //     if (!user) throw new UnauthorizedException('Invalid credentials');

    //     const isPasswordValid = await bcrypt.compare(password, user.password);
    //     if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

    //     return user;
    // }

    // ✅ Login and generate JWT token
    async login(userDto: any) {
        const user = await this.validateUser(userDto.email, userDto.password);
        const payload = { userId: user.id, email: user.email };

        return {
            access_token: this.jwtService.sign(payload),
            user,
        };
    }

    async create(user: Partial<User>): Promise<User> {
        return this.usersRepository.save(user);
    }


}
