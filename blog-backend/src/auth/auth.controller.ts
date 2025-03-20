import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { FacebookAuthGuard } from './guards/facebook-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    // ✅ Login and get JWT token
    @Post('login')
    async login(@Body() userDto: any) {
        return this.authService.login(userDto);
    }

    @Get('google')
    @UseGuards(GoogleAuthGuard)
    async googleAuth(@Req() req) {
        return req.user;
    }

    @Get('google/callback')
    @UseGuards(GoogleAuthGuard)
    async googleAuthRedirect(@Req() req) {
        return this.authService.validateOAuthLogin(req.user, 'google');
    }

    @Get('facebook')
    @UseGuards(FacebookAuthGuard)
    async facebookAuth(@Req() req) {
        return req.user;
    }

    @Get('facebook/callback')
    @UseGuards(FacebookAuthGuard)
    async facebookAuthRedirect(@Req() req) {
        return this.authService.validateOAuthLogin(req.user, 'facebook');
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    async getProfile(@Req() req) {
        return req.user;
    }
}
