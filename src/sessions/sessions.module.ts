import { TypeOrmModule } from '@nestjs/typeorm';

import { Module, forwardRef } from '@nestjs/common';
import { SessionsController } from './sessions.controller';

@Module({
  imports: [
    // forwardRef(() => AnalyticModule),
    // OrganizationModule,
  ],
  exports: [
    
  ],
  controllers: [SessionsController],
  providers: [],
})
export class SessionsModule {}
