import { Controller, Get, Post, Patch, Delete, Body, Param, Query, NotFoundException, Req } from '@nestjs/common';

import { MessageService } from './message.service';

import { Message } from './message.entity';

import { ApiTags, ApiResponse, ApiOperation, ApiBody } from '@nestjs/swagger';

import { ChannelService } from '../channel/channel.service'

@ApiTags('messages')
@Controller('api/messages')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly channelService: ChannelService,
  ) {}

  @ApiOperation({ summary: 'Get all messages' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Get()
  async findAll(
    @Req() req: Request,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search?: string,
  ) {
    const { data, total } = await this.messageService.findAll(page, limit, search);
    const payload = { data, total };
    
    return payload;
  }

  @ApiOperation({ summary: 'Get a message by id' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Get(':id')
  async findOne(
    @Req() req: Request,
    @Param('id') id: string
  ): Promise<Message> {
    const payload = await this.messageService.findOne(id);
    
    return payload;
  }

  @ApiOperation({ summary: 'Create a message' })
  @ApiBody({ type: Message })
  @ApiResponse({ status: 201, description: 'Success', type: Message })
  @Post()
  async create(
    @Req() req: Request,
    @Body() messageData: Message
  ): Promise<Message> {
    const payload = await this.messageService.create(messageData);
    
    return payload;
  }

  @ApiOperation({ summary: 'Update a message' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Patch(':id')
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updatedMessageData: Message
  ): Promise<Message> {
    const payload = await this.messageService.update(id, updatedMessageData);
    
    return payload;
  }

  @ApiOperation({ summary: 'Delete a message' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Delete(':id')
  async remove(
    @Req() req: Request,
    @Param('id') id: string
  ): Promise<void> {
    const payload = await this.messageService.remove(id);
    
    return payload;
  }

  @ApiOperation({ summary: 'Find categories related to an organization' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Get('channelMessage/:id')
  async findChannelMessage(
    @Req() req: Request,
    @Param('id') channelId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search?: string,
  ): Promise<any> {
    const channel = await this.channelService.findOne(channelId);

    if (!channel) {
      throw new NotFoundException('Channel not found');
    }

    const { data, total } = await this.messageService.findChannelMessage(channel, page, limit, search);
    const payload = { data, total };
    
    return payload;
  }
}
