import { Controller, Post, Request, UseGuards, Param } from '@nestjs/common';
import { LocalUserAuthGuard } from './local-user-auth.guard';
import { AuthService } from './auth.service';

import { ApiTags, ApiResponse, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Auth user via JWT' })
  @ApiResponse({ status: 200, description: 'Success' })
  @UseGuards(LocalUserAuthGuard)
  @Post('login')
  async userLogin(@Request() req) {
    // console.log('userLogin', req)
    return this.authService.userLogin(req.user);
  }

  // @ApiOperation({ summary: 'Auth account via JWT' })
  // @ApiResponse({ status: 200, description: 'Success' })
  // @UseGuards(LocalAccountAuthGuard)
  // @Post('accountLogin')
  // async accountLogin(@Request() req) {
  //   // console.log('accountLogin', req)
  //   return this.authService.accountLogin(req.user);
  // }
}
