import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, Req } from '@nestjs/common';

import { ContactService } from './contact.service';

import { Contact } from './contact.entity';

import { ApiTags, ApiResponse, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('contacts')
@Controller('api/contacts')
export class ContactController {
  constructor(
    private readonly contactService: ContactService
  ) {}

  @ApiOperation({ summary: 'Get all contacts' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Get()
  async findAll(
    @Req() req: Request,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search?: string,
  ) {
    const { data, total } = await this.contactService.findAll(page, limit, search);
    const payload = { data, total };
    
    return payload;
  }

  @ApiOperation({ summary: 'Get a contact by id' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Get(':id')
  async findOne(
    @Req() req: Request,
    @Param('id') id: string
  ): Promise<Contact> {
    const payload = await this.contactService.findOne(id);
    
    return payload;
  }

  @ApiOperation({ summary: 'Get a contact by email address' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Get('emailAddress/:emailAddress')
  async getByEmailAddress(
    @Req() req: Request,
    @Param('emailAddress') emailAddress: string
  ): Promise<Contact> {
    const payload = await this.contactService.findByEmailAddress(emailAddress);
    
    return payload;
  }

  @ApiOperation({ summary: 'Get a contact by phone number' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Get('phoneNumber/:phoneNumber')
  async getByPhoneNumber(
    @Req() req: Request,
    @Param('phoneNumber') phoneNumber: string
  ): Promise<Contact> {
    const payload = await this.contactService.findByPhoneNumber(phoneNumber);
    
    return payload;
  }

  @ApiOperation({ summary: 'Create a contact' })
  @ApiBody({ type: Contact })
  @ApiResponse({ status: 201, description: 'Success', type: Contact })
  @Post()
  async create(
    @Req() req: Request,
    @Body() contactData: Contact
  ): Promise<Contact> {
    let payload: any;
    
    try {
      payload = await this.contactService.create(contactData);
      payload.error = false;
    } catch (e) {
      payload = e
      payload.error = true;
    }

    return payload;
  }

  @ApiOperation({ summary: 'Update a contact' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Patch(':id')
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updatedContactData: Contact
  ): Promise<Contact> {
    const payload = await this.contactService.update(id, updatedContactData);
    
    return payload;
  }

  @ApiOperation({ summary: 'Delete a contact' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Delete(':id')
  async remove(
    @Req() req: Request,
    @Param('id') id: string
  ): Promise<void> {
    const payload = await this.contactService.remove(id);
    
    return payload;
  }
}
