import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { Channel } from '../channel/channel.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}
  
  getHello(): string {
    return 'Hello World!';
  }
  
  async findAll(page: number, limit: number, search?: string): Promise<{ data: Message[]; total: number }> {
    const query = this.messageRepository.createQueryBuilder('message');
  
    if (search) {
      query.where(
        '(message.text LIKE :search)',
        { search: `%${search}%` }
      );
    }
  
    query.leftJoinAndSelect('message.session', 'session');
    
    const offset = (page - 1) * limit;
  
    const [data, total] = await query.skip(offset).take(limit).getManyAndCount();
  
    return { data, total };
  }

  async findOne(id: string): Promise<Message> {
    return this.messageRepository.findOne({ 
      where: {
        id: id
      },
      relations: [
        'session',
      ]
    });
  }

  async create(message: Message): Promise<Message> {
    const newObject = this.messageRepository.create(message);
    return this.messageRepository.save(newObject);
  }

  async update(id: string, message: Message): Promise<Message> {
    await this.messageRepository.update(id, message);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.messageRepository.delete(id);
  }

  async findChannelMessage(channel: Channel, page: number, limit: number, search?: string): Promise<{ data: Message[]; total: number }> {
    const query = this.messageRepository.createQueryBuilder('message');
  
    query.where(
      'message.channelId = :channelId',
      { channelId: channel.id }
    );

    if (search) {
      query.andWhere(
        '(message.text LIKE :search)',
        { search: `%${search}%` }
      );
    }
    
    query.leftJoinAndSelect('message.session', 'session');
  
    const offset = (page - 1) * limit;
    
    const [data, total] = await query.skip(offset).take(limit).getManyAndCount();
  
    return { data, total };
  }
}