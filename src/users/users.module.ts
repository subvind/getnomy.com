import { TypeOrmModule } from '@nestjs/typeorm';

import { Module, forwardRef } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { UsersController } from './users.controller';

@Module({
  imports: [
    // forwardRef(() => AnalyticModule),
    // OrganizationModule,
    HttpModule
  ],
  exports: [
    
  ],
  controllers: [UsersController],
  providers: [],
})
export class UsersModule {}
