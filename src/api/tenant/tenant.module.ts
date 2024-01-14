import { TypeOrmModule } from '@nestjs/typeorm';

import { Module, forwardRef } from '@nestjs/common';
import { TenantController } from './tenant.controller';
import { TenantService } from './tenant.service';

import { Tenant } from './tenant.entity';
// import { OrganizationModule } from '../organizations/organization.module';
// import { AnalyticModule } from 'src/analytics/analytic.module';

@Module({
  imports: [
    // forwardRef(() => AnalyticModule),
    // OrganizationModule,
    TypeOrmModule.forFeature([Tenant]),
  ],
  exports: [
    TenantService
  ],
  controllers: [TenantController],
  providers: [TenantService],
})
export class TenantModule {}
