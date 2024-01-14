import { TypeOrmModule } from '@nestjs/typeorm';

import { Module, forwardRef } from '@nestjs/common';
import { CommunityController } from './community.controller';
import { CommunityService } from './community.service';

import { Community } from './community.entity';
// import { OrganizationModule } from '../organizations/organization.module';
// import { AnalyticModule } from 'src/analytics/analytic.module';

@Module({
  imports: [
    // forwardRef(() => AnalyticModule),
    // OrganizationModule,
    TypeOrmModule.forFeature([Community]),
  ],
  exports: [
    CommunityService
  ],
  controllers: [CommunityController],
  providers: [CommunityService],
})
export class CommunityModule {}
