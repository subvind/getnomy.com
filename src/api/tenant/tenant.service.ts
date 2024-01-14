import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from './tenant.entity';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
  ) {}
  
  getHello(): string {
    return 'Hello World!';
  }
  
  async findAll(page: number, limit: number, search?: string): Promise<{ data: Tenant[]; total: number }> {
    const query = this.tenantRepository.createQueryBuilder('tenant');
  
    if (search) {
      query.where(
        'tenant.slug LIKE :search OR tenant.description LIKE :search',
        { search: `%${search}%` }
      );
    }
  
    // query.leftJoinAndSelect('tenant.messages', 'messages');
    
    const offset = (page - 1) * limit;
  
    const [data, total] = await query.skip(offset).take(limit).getManyAndCount();
  
    return { data, total };
  }

  async findOne(id: string): Promise<Tenant> {
    return this.tenantRepository.findOne({ 
      where: {
        id: id
      },
      relations: [
        // 'messages',
      ]
    });
  }

  async findBySlug(slug: string): Promise<Tenant> {
    return this.tenantRepository.findOne({ 
      where: {
        slug: slug
      },
      relations: [
        // 'messages',
      ]
    });
  }

  async create(tenant: Tenant): Promise<Tenant> {
    const newObject = this.tenantRepository.create(tenant);
    return this.tenantRepository.save(newObject);
  }

  async update(id: string, tenant: Tenant): Promise<Tenant> {
    await this.tenantRepository.update(id, tenant);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.tenantRepository.delete(id);
  }
}