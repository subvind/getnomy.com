import { TypeOrmModule } from '@nestjs/typeorm';

import { Module, forwardRef } from '@nestjs/common';
import { ChannelController } from './channel.controller';
import { ChannelService } from './channel.service';

import { Channel } from './channel.entity';
// import { OrganizationModule } from '../organizations/organization.module';
// import { AnalyticModule } from 'src/analytics/analytic.module';

@Module({
  imports: [
    // forwardRef(() => AnalyticModule),
    // OrganizationModule,
    TypeOrmModule.forFeature([Channel]),
  ],
  exports: [
    ChannelService
  ],
  controllers: [ChannelController],
  providers: [ChannelService],
})
export class ChannelModule {}
