import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Community } from './community.entity';

@Injectable()
export class CommunityService {
  constructor(
    @InjectRepository(Community)
    private readonly communityRepository: Repository<Community>,
  ) {}
  
  getHello(): string {
    return 'Hello World!';
  }
  
  async findAll(page: number, limit: number, search?: string): Promise<{ data: Community[]; total: number }> {
    const query = this.communityRepository.createQueryBuilder('community');
  
    if (search) {
      query.where(
        'community.slug LIKE :search OR community.description LIKE :search',
        { search: `%${search}%` }
      );
    }
  
    // query.leftJoinAndSelect('community.messages', 'messages');
    
    const offset = (page - 1) * limit;
  
    const [data, total] = await query.skip(offset).take(limit).getManyAndCount();
  
    return { data, total };
  }

  async findOne(id: string): Promise<Community> {
    return this.communityRepository.findOne({ 
      where: {
        id: id
      },
      relations: [
        // 'messages',
      ]
    });
  }

  async findBySlug(slug: string): Promise<Community> {
    return this.communityRepository.findOne({ 
      where: {
        slug: slug
      },
      relations: [
        // 'messages',
      ]
    });
  }

  async create(community: Community): Promise<Community> {
    const newObject = this.communityRepository.create(community);
    return this.communityRepository.save(newObject);
  }

  async update(id: string, community: Community): Promise<Community> {
    await this.communityRepository.update(id, community);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.communityRepository.delete(id);
  }
}