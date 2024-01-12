import { TypeOrmModule } from '@nestjs/typeorm';

import { Module, forwardRef } from '@nestjs/common';
import { MessagesController } from './messages.controller';

@Module({
  imports: [
    // forwardRef(() => AnalyticModule),
    // OrganizationModule,
  ],
  exports: [
    
  ],
  controllers: [MessagesController],
  providers: [],
})
export class MessagesModule {}
