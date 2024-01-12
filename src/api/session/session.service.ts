import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from './session.entity';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
  ) {}
  
  getHello(): string {
    return 'Hello World!';
  }
  
  async findAll(page: number, limit: number, search?: string): Promise<{ data: Session[]; total: number }> {
    const query = this.sessionRepository.createQueryBuilder('session');
  
    if (search) {
      query.where(
        '(session.displayName LIKE :search OR session.externalId LIKE :search)',
        { search: `%${search}%` }
      );
    }
  
    // query.leftJoinAndSelect('session.category', 'category');
    
    const offset = (page - 1) * limit;
  
    const [data, total] = await query.skip(offset).take(limit).getManyAndCount();
  
    return { data, total };
  }

  async findOne(id: string): Promise<Session> {
    return this.sessionRepository.findOne({ 
      where: {
        id: id
      },
      relations: [
        // 'category',
      ]
    });
  }

  async findByExternalId(externalId: string): Promise<Session> {
    return this.sessionRepository.findOne({ 
      where: {
        externalId: externalId
      },
      relations: [
        // 'category',
      ]
    });
  }

  async create(session: Session): Promise<Session> {
    const newObject = this.sessionRepository.create(session);
    return this.sessionRepository.save(newObject);
  }

  async update(id: string, session: Session): Promise<Session> {
    await this.sessionRepository.update(id, session);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.sessionRepository.delete(id);
  }
}