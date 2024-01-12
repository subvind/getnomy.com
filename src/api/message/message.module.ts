import { TypeOrmModule } from '@nestjs/typeorm';

import { Module, forwardRef } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

import { Message } from './message.entity';
import { ChannelModule } from '../channel/channel.module';

@Module({
  imports: [
    ChannelModule,
    TypeOrmModule.forFeature([Message]),
  ],
  exports: [
    MessageService
  ],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
