import { TypeOrmModule } from '@nestjs/typeorm';

import { Module, forwardRef } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TenantsController } from './tenants.controller';

@Module({
  imports: [
    HttpModule
  ],
  exports: [
    
  ],
  controllers: [TenantsController],
  providers: [],
})
export class TenantsModule {}
