import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, Req } from '@nestjs/common';

import { ChannelService } from './channel.service';

import { Channel } from './channel.entity';
import { NotFoundException } from '@nestjs/common'; // Import the NotFoundException

import { ApiTags, ApiResponse, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('channels')
@Controller('api/channels')
export class ChannelController {
  constructor(
    private readonly channelService: ChannelService,
  ) {}

  @ApiOperation({ summary: 'Get all channels' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Get()
  async findAll(
    @Req() req: Request,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search?: string,
  ) {
    const { data, total } = await this.channelService.findAll(page, limit, search);
    const payload = { data, total };
    
    return payload;
  }

  @ApiOperation({ summary: 'Get a channel by id' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Get(':id')
  async findOne(
    @Req() req: Request,
    @Param('id') id: string
  ): Promise<Channel> {
    const payload = await this.channelService.findOne(id);
    
    return payload;
  }

  @ApiOperation({ summary: 'Get a channel by URL slug' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Get('slug/:slug')
  async findSingle(
    @Req() req: Request,
    @Param('slug') slug: string
  ): Promise<Channel> {
    const payload = await this.channelService.findBySlug(slug);

    return payload;
  }

  @ApiOperation({ summary: 'Create a channel' })
  @ApiBody({ type: Channel })
  @ApiResponse({ status: 201, description: 'Success', type: Channel })
  @Post()
  async create(
    @Req() req: Request,
    @Body() channelData: Channel
  ): Promise<Channel> {
    try {
      const payload: any = await this.channelService.create(channelData);
      payload.error = false;
      return payload;
    } catch (e) {
      e.error = true;
      return e
    }
  }

  @ApiOperation({ summary: 'Update a channel' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Patch(':id')
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updatedChannelData: Channel
  ): Promise<Channel> {
    const payload = await this.channelService.update(id, updatedChannelData);

    return payload;
  }

  @ApiOperation({ summary: 'Delete a channel' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Delete(':id')
  async remove(
    @Req() req: Request,
    @Param('id') id: string
  ): Promise<void> {
    const payload = await this.channelService.remove(id);
    
    return payload;
  }
}
