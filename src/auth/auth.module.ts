import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports: [
    UserModule, 
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService:ConfigService) =>{
         return {
          secret: configService.get("JWT_SECRET"),
          signOptions: { expiresIn: '2 days' },
    
         }
      }
    })],
  providers: [AuthService,JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
