import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, Req } from '@nestjs/common';

import { UserService } from './user.service';

import { User } from './user.entity';

import { ApiTags, ApiResponse, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('users')
@Controller('api/users')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Get()
  async findAll(
    @Req() req: Request,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search?: string,
  ) {
    const { data, total } = await this.userService.findAll(page, limit, search);
    const payload = { data, total };
    
    return payload;
  }

  @ApiOperation({ summary: 'Get a user by id' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Get(':id')
  async findOne(
    @Req() req: Request,
    @Param('id') id: string
  ): Promise<User> {
    const payload = await this.userService.findOne(id);
    
    return payload;
  }

  @ApiOperation({ summary: 'Get a user by external id' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Get('username/:username')
  async findSingle(
    @Req() req: Request,
    @Param('username') username: string,
  ): Promise<User> {
    const payload = await this.userService.findByUsername(username);
    
    return payload;
  }

  @ApiOperation({ summary: 'Create a user' })
  @ApiBody({ type: User })
  @ApiResponse({ status: 201, description: 'Success', type: User })
  @Post()
  async create(
    @Req() req: Request,
    @Body() userData: User
  ): Promise<User> {
    let payload: any;
    
    try {
      payload = await this.userService.create(userData);
      payload.error = false;
    } catch (e) {
      payload = e
      payload.error = true;
    }

    return payload;
  }

  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Patch(':id')
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updatedUserData: User
  ): Promise<User> {
    const payload = await this.userService.update(id, updatedUserData);
    
    return payload;
  }

  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Delete(':id')
  async remove(
    @Req() req: Request,
    @Param('id') id: string
  ): Promise<void> {
    const payload = await this.userService.remove(id);
    
    return payload;
  }
}
