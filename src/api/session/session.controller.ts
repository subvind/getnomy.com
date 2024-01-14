import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, Req } from '@nestjs/common';

import { SessionService } from './session.service';

import { Session } from './session.entity';

import { ApiTags, ApiResponse, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('sessions')
@Controller('api/sessions')
export class SessionController {
  constructor(
    private readonly sessionService: SessionService
  ) {}

  @ApiOperation({ summary: 'Get all sessions' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Get()
  async findAll(
    @Req() req: Request,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search?: string,
  ) {
    const { data, total } = await this.sessionService.findAll(page, limit, search);
    const payload = { data, total };
    
    return payload;
  }

  @ApiOperation({ summary: 'Get a session by id' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Get(':id')
  async findOne(
    @Req() req: Request,
    @Param('id') id: string
  ): Promise<Session> {
    const payload = await this.sessionService.findOne(id);
    
    return payload;
  }

  @ApiOperation({ summary: 'Get a session by cookie' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Get('cookie/:cookie')
  async findSingle(
    @Req() req: Request,
    @Param('cookie') cookie: string
  ): Promise<Session> {
    const payload = await this.sessionService.findByCookie(cookie);

    return payload;
  }

  @ApiOperation({ summary: 'Create a session' })
  @ApiBody({ type: Session })
  @ApiResponse({ status: 201, description: 'Success', type: Session })
  @Post()
  async create(
    @Req() req: Request,
    @Body() sessionData: Session
  ): Promise<Session> {
    let payload: any;

    sessionData.ipAddress = req.headers['X-Forwarded-For'];
    sessionData.userAgent = req.headers['user-agent'];
    
    try {
      payload = await this.sessionService.create(sessionData);
      payload.error = false;
    } catch (e) {
      payload = e
      payload.error = true;
    }
    
    return payload;
  }

  @ApiOperation({ summary: 'Update a session' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Patch(':id')
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updatedSessionData: Session
  ): Promise<Session> {
    const payload = await this.sessionService.update(id, updatedSessionData);
    
    return payload;
  }

  @ApiOperation({ summary: 'Delete a session' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Delete(':id')
  async remove(
    @Req() req: Request,
    @Param('id') id: string
  ): Promise<void> {
    const payload = await this.sessionService.remove(id);
    
    return payload;
  }
}
