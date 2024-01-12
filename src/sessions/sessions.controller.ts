import { Controller, Get, Render, Req, Res, Post } from '@nestjs/common';

@Controller('sessions')
export class SessionsController {
  constructor() {}

  @Get()
  @Render('sessions/index')
  getSessions() {
    return { layout: false };
  }
}
