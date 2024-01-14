import { TypeOrmModule } from '@nestjs/typeorm';

import { Module, forwardRef } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';

import { Contact } from './contact.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contact]),
  ],
  exports: [
    ContactService
  ],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
