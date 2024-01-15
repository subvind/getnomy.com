import { Controller, Get, Render, Req, Query, Post, Body } from '@nestjs/common';

import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';

import { ApiTags, ApiResponse, ApiOperation, ApiBody } from '@nestjs/swagger';

const port = process.env.PORT || 3000

@ApiTags('communities')
@Controller('htmx/communities')
export class CommunitiesController {
  constructor(
    private readonly httpService: HttpService
  ) {}

  @Get()
  @Render('communities/index')
  getCommunities() {
    return { 
      layout: false
    };
  }

  @Get('list-communities')
  @Render('communities/list-communities')
  async listCommunities() {
    const params = {
      page: 1,
      limit: 10,
      search: '',
    };

    const payload = await firstValueFrom(
      this.httpService.get(`http://localhost:${port}/api/communities`, { params }).pipe(
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

  @Get('new-community')
  @Render('communities/new-community')
  newTenant() {
    return { layout: false };
  }

  @Post()
  @Render('communities/community-created')
  async createTenant(
    @Req() req: Request,
    @Body() communityData: any
  ) {
    const payload = await firstValueFrom(
      this.httpService.post(
        `http://localhost:${port}/api/communities`, // url
        communityData // data
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
  @Render('communities/communities-table')
  async communitiesTable(
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
      this.httpService.get(`http://localhost:${port}/api/communities`, { params }).pipe(
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
