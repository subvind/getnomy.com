import { Module, forwardRef } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LocalUserStrategy } from './local-user.strategy';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
// import { AccountModule } from '../account/account.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { 
        expiresIn: '365 days' 
      },
    }),
  ],
  controllers: [
    AuthController
  ],
  providers: [AuthService, LocalUserStrategy],
  exports: [AuthService],
})
export class AuthModule {}