import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';

import { UserService } from './user.service';

import { User } from './user.entity';

import { ApiTags, ApiResponse, ApiOperation, ApiBody } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import { hash } from 'bcrypt';

@ApiTags('users')
@Controller('api/users')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @ApiOperation({ summary: 'Find all users' })
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

  @ApiOperation({ summary: 'Find a user by id' })
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
    let user = await this.userService.findRecord(id);
    let data
    const { password, ...userDataWithoutPassword } = updatedUserData;
    if (user.username === 'test') {
      // don't allow the password to be changed on test account
      data = userDataWithoutPassword 
    } else {
      // allow password to be changed this is not a test account
      data = updatedUserData
    }

    // for security reasons don't allow these values to be changed
    const { username, authStatus, ...userDataWithoutSecureInfo } = data;
    data = userDataWithoutSecureInfo

    const payload = await this.userService.update(id, data);
    
    return payload;
  }

  @ApiOperation({ summary: 'Remove a user' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Delete(':id')
  async remove(
    @Req() req: Request,
    @Param('id') id: string
  ): Promise<void> {
    const payload = await this.userService.remove(id);
    
    return payload;
  }

  @ApiOperation({ summary: 'Recover a user\'s password by username' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Post('recoverPassword/:username')
  async recoverPassword(
    @Req() req: Request,
    @Param('username') username: string
  ): Promise<Boolean> {
    let user = await this.userService.findByUsername(username)
    if (user) {
      user = await this.userService.findRecord(user.id);
    }
    
    if (!user) {
      throw new NotFoundException('User or organization not found');
    }

    // change
    user.recoverPasswordToken = uuidv4()
    
    // send changes to database
    await this.userService.update(user.id, user);

    // Send the verification email
    await this.userService.sendPasswordRevocery(user.contact.emailAddress, user.recoverPasswordToken);

    const payload = true;
    
    return payload;
  }

  @ApiOperation({ summary: 'Reset a user\'s password' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Patch('resetPassword/:email')
  async resetPassword(
    @Req() req: Request,
    @Param('username') username: string,
    @Body() updatedUserData: User
  ): Promise<User> {
    let user = await this.userService.findByUsername(username)
    if (user) {
      user = await this.userService.findRecord(user.id);
    }
    let data: any = {}

    // if recoverPasswordToken is being submitted then
    if (updatedUserData.recoverPasswordToken) {
      // check to make sure it matches with what is already there
      // if it matches then set password to new password
      if (updatedUserData.recoverPasswordToken === user.recoverPasswordToken) {
        // update secure info
        data = {
          password: await hash(updatedUserData.password, 10)
        }
      } else {
        // do nothing
        throw new NotFoundException('Recover Password Token not found.')
      }
    }

    const payload = await this.userService.update(user.id, data);
    
    return payload;
  }
}
