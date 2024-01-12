import { TypeOrmModule } from '@nestjs/typeorm';

import { Module, forwardRef } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ChannelsController } from './channels.controller';

@Module({
  imports: [
    HttpModule
  ],
  exports: [
    
  ],
  controllers: [ChannelsController],
  providers: [],
})
export class ChannelsModule {}
