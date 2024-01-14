import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import config from './typeorm.config'; // Import your TypeORM configuration file
import { HttpModule } from '@nestjs/axios';

// api
import { CommunityModule } from './api/community/community.module';
import { ContactModule } from './api/contact/contact.module';
import { TenantModule } from './api/tenant/tenant.module';
import { UserModule } from './api/user/user.module';

// frontend
import { AuthModule } from './auth/auth.module';
import { CommunitiesModule } from './communities/communities.module';
import { TenantsModule } from './tenants/tenants.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forRoot(config),
    // api
    CommunityModule,
    ContactModule,
    TenantModule,
    UserModule,

    // frontend
    AuthModule,
    CommunitiesModule,
    TenantsModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
