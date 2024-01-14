import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, Req } from '@nestjs/common';

import { CommunityService } from './community.service';

import { Community } from './community.entity';
import { NotFoundException } from '@nestjs/common'; // Import the NotFoundException

import { ApiTags, ApiResponse, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('communities')
@Controller('api/communities')
export class CommunityController {
  constructor(
    private readonly communityService: CommunityService,
  ) {}

  @ApiOperation({ summary: 'Get all communities' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Get()
  async findAll(
    @Req() req: Request,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search?: string,
  ) {
    const { data, total } = await this.communityService.findAll(page, limit, search);
    const payload = { data, total };
    
    return payload;
  }

  @ApiOperation({ summary: 'Get a community by id' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Get(':id')
  async findOne(
    @Req() req: Request,
    @Param('id') id: string
  ): Promise<Community> {
    const payload = await this.communityService.findOne(id);
    
    return payload;
  }

  @ApiOperation({ summary: 'Get a community by URL slug' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Get('slug/:slug')
  async findSingle(
    @Req() req: Request,
    @Param('slug') slug: string
  ): Promise<Community> {
    const payload = await this.communityService.findBySlug(slug);

    return payload;
  }

  @ApiOperation({ summary: 'Create a community' })
  @ApiBody({ type: Community })
  @ApiResponse({ status: 201, description: 'Success', type: Community })
  @Post()
  async create(
    @Req() req: Request,
    @Body() communityData: Community
  ): Promise<Community> {
    let payload: any;
    
    try {
      payload = await this.communityService.create(communityData);
      payload.error = false;
    } catch (e) {
      payload = e
      payload.error = true;
    }

    return payload;
  }

  @ApiOperation({ summary: 'Update a community' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Patch(':id')
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updatedCommunityData: Community
  ): Promise<Community> {
    const payload = await this.communityService.update(id, updatedCommunityData);

    return payload;
  }

  @ApiOperation({ summary: 'Delete a community' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Delete(':id')
  async remove(
    @Req() req: Request,
    @Param('id') id: string
  ): Promise<void> {
    const payload = await this.communityService.remove(id);
    
    return payload;
  }
}
