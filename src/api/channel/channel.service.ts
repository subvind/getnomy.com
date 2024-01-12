import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Channel } from './channel.entity';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel)
    private readonly channelRepository: Repository<Channel>,
  ) {}
  
  getHello(): string {
    return 'Hello World!';
  }
  
  async findAll(page: number, limit: number, search?: string): Promise<{ data: Channel[]; total: number }> {
    const query = this.channelRepository.createQueryBuilder('channel');
  
    if (search) {
      query.where(
        'channel.slug LIKE :search OR channel.description LIKE :search',
        { search: `%${search}%` }
      );
    }
  
    // query.leftJoinAndSelect('channel.messages', 'messages');
    
    const offset = (page - 1) * limit;
  
    const [data, total] = await query.skip(offset).take(limit).getManyAndCount();
  
    return { data, total };
  }

  async findOne(id: string): Promise<Channel> {
    return this.channelRepository.findOne({ 
      where: {
        id: id
      },
      relations: [
        // 'messages',
      ]
    });
  }

  async findBySlug(slug: string): Promise<Channel> {
    return this.channelRepository.findOne({ 
      where: {
        slug: slug
      },
      relations: [
        // 'messages',
      ]
    });
  }

  async create(channel: Channel): Promise<Channel> {
    const newObject = this.channelRepository.create(channel);
    return this.channelRepository.save(newObject);
  }

  async update(id: string, channel: Channel): Promise<Channel> {
    await this.channelRepository.update(id, channel);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.channelRepository.delete(id);
  }
}