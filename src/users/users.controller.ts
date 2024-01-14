import { Controller, Get, Render, Req, Res, Post, Body } from '@nestjs/common';

import { ApiTags, ApiResponse, ApiOperation, ApiBody } from '@nestjs/swagger';

import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';

const port = process.env.PORT || 3000

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly httpService: HttpService
  ) {}

  @Get()
  @Render('users/index')
  getUsers() {
    return { layout: false };
  }
}
