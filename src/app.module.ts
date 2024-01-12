import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import config from './typeorm.config'; // Import your TypeORM configuration file

// api
import { ChannelModule } from './api/channel/channel.module';
import { MessageModule } from './api/message/message.module';
import { SessionModule } from './api/session/session.module';

// frontend
import { ChannelsModule } from './channels/channels.module';
import { MessagesModule } from './messages/messages.module';
import { SessionsModule } from './sessions/sessions.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    // api
    ChannelModule,
    MessageModule,
    SessionModule,

    // frontend
    ChannelsModule,
    MessagesModule,
    SessionsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
