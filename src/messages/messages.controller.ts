import { Controller, Get, Render, Req, Res, Post } from '@nestjs/common';

@Controller('messages')
export class MessagesController {
  constructor() {}

  @Get()
  @Render('messages/index')
  getMessages() {
    return { layout: false };
  }
}
