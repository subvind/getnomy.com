import { Controller, Get, Render, Req, Res, Post, Param } from '@nestjs/common';
import { AppService } from './app.service';

import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';

const port = process.env.PORT || 3000

@Controller()
export class AppController {
  constructor(
    private readonly httpService: HttpService
  ) {}

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

  @Get('message')
  @Render('message')
  getMessage() {
    return {};
  }

  @Post('broadcast')
  postData(@Req() req, @Res() res) {
    // Handle your POST request data
    const channel = req.body.channel || 'No channel received';

    // You can process the data here and send a response
    const response = `Received data: ${channel}`;

    // Send the response back
    res.send(response);
  }

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
}
