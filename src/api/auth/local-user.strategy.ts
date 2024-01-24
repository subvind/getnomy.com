import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalUserStrategy extends PassportStrategy(Strategy, 'user-local') {
  constructor(private authService: AuthService) {
    super({ 
      usernameField: 'username'
    });
  }

  async validate(username: string, password: string): Promise<any> {
    // console.log('LocalUserStrategy', username, password)
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}