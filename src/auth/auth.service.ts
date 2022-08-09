import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
   constructor(
      private userService: UserService,
      private jwtService: JwtService
      ){}

   async validateUser(username: string, password: string): Promise<any> {
       const user = await this.userService.findOneUser(username)
       if (!user) {
         throw new UnauthorizedException({
             message: ['Username is wrong']
         });
       }
       if(user && await bcrypt.compare(password, user.password)){
            //เเยก password ออกจาก username เเละตัวอื่นๆ
           const { password, ...result } = user
           return result
       }
    return null
   }

   async signIn(user: any) {
      const payload = { username: user.username, sub: user.id };
      return {
        accessToken: this.jwtService.sign(payload),
      };
   }

}