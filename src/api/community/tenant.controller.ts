import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, Req } from '@nestjs/common';

import { TenantService } from './tenant.service';

import { Tenant } from './tenant.entity';
import { NotFoundException } from '@nestjs/common'; // Import the NotFoundException

import { ApiTags, ApiResponse, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('tenants')
@Controller('api/tenants')
export class TenantController {
  constructor(
    private readonly tenantService: TenantService,
  ) {}

  @ApiOperation({ summary: 'Get all tenants' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Get()
  async findAll(
    @Req() req: Request,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search?: string,
  ) {
    const { data, total } = await this.tenantService.findAll(page, limit, search);
    const payload = { data, total };
    
    return payload;
  }

  @ApiOperation({ summary: 'Get a tenant by id' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Get(':id')
  async findOne(
    @Req() req: Request,
    @Param('id') id: string
  ): Promise<Tenant> {
    const payload = await this.tenantService.findOne(id);
    
    return payload;
  }

  @ApiOperation({ summary: 'Get a tenant by URL slug' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Get('slug/:slug')
  async findSingle(
    @Req() req: Request,
    @Param('slug') slug: string
  ): Promise<Tenant> {
    const payload = await this.tenantService.findBySlug(slug);

    return payload;
  }

  @ApiOperation({ summary: 'Create a tenant' })
  @ApiBody({ type: Tenant })
  @ApiResponse({ status: 201, description: 'Success', type: Tenant })
  @Post()
  async create(
    @Req() req: Request,
    @Body() tenantData: Tenant
  ): Promise<Tenant> {
    let payload: any;
    
    try {
      payload = await this.tenantService.create(tenantData);
      payload.error = false;
    } catch (e) {
      payload = e
      payload.error = true;
    }

    return payload;
  }

  @ApiOperation({ summary: 'Update a tenant' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Patch(':id')
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updatedTenantData: Tenant
  ): Promise<Tenant> {
    const payload = await this.tenantService.update(id, updatedTenantData);

    return payload;
  }

  @ApiOperation({ summary: 'Delete a tenant' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Delete(':id')
  async remove(
    @Req() req: Request,
    @Param('id') id: string
  ): Promise<void> {
    const payload = await this.tenantService.remove(id);
    
    return payload;
  }
}
