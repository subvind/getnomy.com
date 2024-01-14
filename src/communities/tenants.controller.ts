import { Controller, Get, Render, Req, Query, Post, Body } from '@nestjs/common';

import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';

import { ApiTags, ApiResponse, ApiOperation, ApiBody } from '@nestjs/swagger';

const port = process.env.PORT || 3000

@ApiTags('tenants')
@Controller('tenants')
export class TenantsController {
  constructor(
    private readonly httpService: HttpService
  ) {}

  @Get()
  @Render('tenants/index')
  getTenants() {
    return { 
      layout: false
    };
  }

  @Get('list-tenants')
  @Render('tenants/list-tenants')
  async listTenants() {
    const params = {
      page: 1,
      limit: 10,
      search: '',
    };

    const payload = await firstValueFrom(
      this.httpService.get(`http://localhost:${port}/api/tenants`, { params }).pipe(
        catchError((error: any) => {
          return Promise.reject(error.response.data);
        })
      )
    );

    return { 
      layout: false,
      table: payload.data
    };
  }

  @Get('new-tenant')
  @Render('tenants/new-tenant')
  newTenant() {
    return { layout: false };
  }

  @Post()
  @Render('tenants/tenant-created')
  async createTenant(
    @Req() req: Request,
    @Body() tenantData: any
  ) {
    const payload = await firstValueFrom(
      this.httpService.post(
        `http://localhost:${port}/api/tenants`, // url
        tenantData // data
      ).pipe(
        catchError((error: any) => {
          return Promise.reject(error.response.data);
        })
      )
    );

    return {
      layout: false,
      created: payload.data
    }
  }

  @Get('table')
  @Render('tenants/tenants-table')
  async tenantsTable(
    @Req() req: Request,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search?: string,
  ) {
    const params = {
      page,
      limit,
      search,
    };

    const payload = await firstValueFrom(
      this.httpService.get(`http://localhost:${port}/api/tenants`, { params }).pipe(
        catchError((error: any) => {
          return Promise.reject(error.response.data);
        })
      )
    );

    return { 
      layout: false,
      table: payload.data
    };
  }
}
