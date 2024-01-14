import { Controller, Get, Render, Req, Res, Post, Body } from '@nestjs/common';

import { ApiTags, ApiResponse, ApiOperation, ApiBody } from '@nestjs/swagger';

import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';

const port = process.env.PORT || 3000

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly httpService: HttpService
  ) {}

  @Get()
  @Render('auth/index')
  getAuth() {
    return { layout: false };
  }

  @Post('register')
  @Render('auth/registered')
  async createUser(
    @Req() req: Request,
    @Body() channelData: any
  ) {
    if (channelData.password != channelData.confirmPassword) {
      return {
        layout: false,
        registered: {
          message: 'Password and confirm password must be the same.'
        }
      }
    }

    const payload = await firstValueFrom(
      this.httpService.post(
        `http://localhost:${port}/api/users`, // url
        channelData // data
      ).pipe(
        catchError((error: any) => {
          return Promise.reject(error.response.data);
        })
      )
    );

    return {
      layout: false,
      registered: payload.data
    }
  }
}
