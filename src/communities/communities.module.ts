import { TypeOrmModule } from '@nestjs/typeorm';

import { Module, forwardRef } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CommunitiesController } from './communities.controller';

@Module({
  imports: [
    HttpModule
  ],
  exports: [
    
  ],
  controllers: [CommunitiesController],
  providers: [],
})
export class CommunitiesModule {}
