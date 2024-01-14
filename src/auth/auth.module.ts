import { TypeOrmModule } from '@nestjs/typeorm';

import { Module, forwardRef } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    // forwardRef(() => AnalyticModule),
    // OrganizationModule,
    HttpModule
  ],
  exports: [
    
  ],
  controllers: [AuthController],
  providers: [],
})
export class AuthModule {}
