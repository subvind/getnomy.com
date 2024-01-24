import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    // console.log('validateUser', username, password)
    const user = await this.userService.findByUsername(username);
    const record = await this.userService.findRecord(user.id);
    if (user && (await this.userService.verifyPassword(record, password))) {
      return user;
    }
    return null;
  }

  async userLogin(user: User) {
    // console.log('userLogin', user)

    // Generate and return a JWT token
    const payload: any = { 
      sub: user.id, 
      username: user.username,
      type: 'user'
    };

    // console.log('login payload', payload)

    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET
      }),
    };
  }
}
