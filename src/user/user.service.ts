import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from "bcrypt"
import { User } from './user.entity'
@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private userRepository : Repository<User>) {}
      async signUp(signUpDto : SignUpDto): Promise<User>{
        try {
          const {
             username,
             password
          } = signUpDto
          
          const hashPassword = await bcrypt.hashSync(password, 10);
          
          const user = await this.userRepository.create({
            username,
            password: hashPassword
          })
    
          return await this.userRepository.save(user)
          
        } catch(e) {
          throw new NotFoundException({
              message: ['Username has been already using.']
          })
        }
      }
      
      async findOneUser(username: any): Promise<User> {
        const user = await this.userRepository.findOneBy({username})        
        return user
}
}
