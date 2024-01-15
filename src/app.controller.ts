import { Controller, Get, Render, Req, Res, Post, Param } from '@nestjs/common';
import { AppService } from './app.service';

import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';

import { ApiTags, ApiResponse, ApiOperation, ApiBody } from '@nestjs/swagger';

const port = process.env.PORT || 3000

@Controller()
export class AppController {
  constructor(
    private readonly httpService: HttpService
  ) {}

  @ApiOperation({ summary: 'Load full homepage view' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Get()
  @Render('index') // 'index' corresponds to the name of your view file without extension
  async getIndex() {
    const params = {
      page: 1,
      limit: 10,
      search: '',
    };

    const payload = await firstValueFrom(
      this.httpService.get(`http://localhost:${port}/api/communities`, { params }).pipe(
        catchError((error: any) => {
          console.log('error', error)
          return Promise.reject(error.response.data);
        })
      )
    );

    return {
      title: 'Instant Messenger Software - nomy.IMS',
      communityTable: payload.data
    };
  }

  @ApiOperation({ summary: 'Load full community view' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Get('community/:communitySlug')
  @Render('indexCommunity') // 'index' corresponds to the name of your view file without extension
  async getCommunity(
    @Param('communitySlug') communitySlug: string
  ) {
    let communityPayload
    try {
      communityPayload = await firstValueFrom(
        this.httpService.get(`http://localhost:${port}/api/communities/slug/${communitySlug}`).pipe(
          catchError((error: any) => {
            console.log('error', error)
            return Promise.reject(error.response.data);
          })
        )
      );
    } catch (e) {
      return {
        title: 'Instant Messenger Software - nomy.IMS',
        tenantTable: null,
        community: null
      }
    }

    const params = {
      page: 1,
      limit: 10,
      search: '',
    };

    const tenantsPayload = await firstValueFrom(
      this.httpService.get(`http://localhost:${port}/api/tenants`, { params }).pipe(
        catchError((error: any) => {
          console.log('error', error)
          return Promise.reject(error.response.data);
        })
      )
    );

    return {
      title: 'Instant Messenger Software - nomy.IMS',
      tenantTable: tenantsPayload.data,
      community: communityPayload
    };
  }

  @ApiOperation({ summary: 'Load full tenant view' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Get('tenant/:tenantSlug')
  @Render('indexTenant') // 'index' corresponds to the name of your view file without extension
  async getTenant(
    @Param('communitySlug') communitySlug: string,
    @Param('tenantSlug') tenantSlug: string
  ) {
    let communityPayload
    try {
      communityPayload = await firstValueFrom(
        this.httpService.get(`http://localhost:${port}/api/communities/slug/${communitySlug}`).pipe(
          catchError((error: any) => {
            console.log('error', error)
            return Promise.reject(error.response.data);
          })
        )
      );
    } catch (e) {
      return {
        title: 'Instant Messenger Software - nomy.IMS',
        community: null,
        tenant: null,
      }
    }

    let tenantPayload
    try {
      tenantPayload = await firstValueFrom(
        this.httpService.get(`http://localhost:${port}/api/communities/slug/${tenantSlug}`).pipe(
          catchError((error: any) => {
            console.log('error', error)
            return Promise.reject(error.response.data);
          })
        )
      );
    } catch (e) {
      return {
        title: 'Instant Messenger Software - nomy.IMS',
        community: null,
        tenant: null,
      }
    }

    return {
      title: 'Instant Messenger Software - nomy.IMS',
      community: communityPayload,
      tenant: tenantPayload
    };
  }
}
