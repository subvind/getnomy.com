import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import config from './typeorm.config'; // Import your TypeORM configuration file
import { HttpModule } from '@nestjs/axios';

// api
import { AuthModule as APIAuthModule } from './api/auth/auth.module';
import { CommunityModule as APICommunityModule } from './api/community/community.module';
import { ContactModule as APIContactModule } from './api/contact/contact.module';
import { SessionModule as APISessionModule } from './api/session/session.module';
import { TenantModule as APITenantModule } from './api/tenant/tenant.module';
import { UserModule as APIUserModule } from './api/user/user.module';

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
    APIAuthModule,
    APICommunityModule,
    APIContactModule,
    APISessionModule,
    APITenantModule,
    APIUserModule,

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
