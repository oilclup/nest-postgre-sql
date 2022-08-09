/* eslint-disable prettier/prettier */
import { Controller, Post, Request,Get, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt/jwt-auth.guards';

@Controller('auth')
export class AuthController {
   constructor(private authService: AuthService) {}

    @Post('signin')
    async signIn(@Body() body : any): Promise<any> {
    const result = await this.authService.validateUser(body.username,body.password)
    let checkResult = await (result !== null) 
    ? this.authService.signIn(result) : "Not found user"
    return checkResult
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req: any): Promise<any> {
        return req.user
    }

}