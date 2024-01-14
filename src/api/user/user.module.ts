import { TypeOrmModule } from '@nestjs/typeorm';

import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

import { User } from './user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  exports: [
    UserService
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
