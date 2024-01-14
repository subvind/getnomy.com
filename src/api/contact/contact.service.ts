import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './contact.entity';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}
  
  getHello(): string {
    return 'Hello World!';
  }
  
  async findAll(page: number, limit: number, search?: string): Promise<{ data: Contact[]; total: number }> {
    const query = this.contactRepository.createQueryBuilder('contact');
  
    if (search) {
      query.where(
        '(contact.emailAddress LIKE :search OR contact.phoneNumber LIKE :search)',
        { search: `%${search}%` }
      );
    }
  
    query.leftJoinAndSelect('contact.user', 'user');
    
    const offset = (page - 1) * limit;
  
    const [data, total] = await query.skip(offset).take(limit).getManyAndCount();
  
    return { data, total };
  }

  async findOne(id: string): Promise<Contact> {
    return this.contactRepository.findOne({ 
      where: {
        id: id
      },
      relations: [
        'user',
      ]
    });
  }

  async findByEmailAddress(emailAddress: string): Promise<Contact> {
    return this.contactRepository.findOne({ 
      where: {
        emailAddress: emailAddress
      },
      relations: [
        'user',
      ]
    });
  }

  async findByPhoneNumber(phoneNumber: string): Promise<Contact> {
    return this.contactRepository.findOne({ 
      where: {
        phoneNumber: phoneNumber
      },
      relations: [
        'user',
      ]
    });
  }

  async create(contact: Contact): Promise<Contact> {
    const newObject = this.contactRepository.create(contact);
    return this.contactRepository.save(newObject);
  }

  async update(id: string, contact: Contact): Promise<Contact> {
    await this.contactRepository.update(id, contact);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.contactRepository.delete(id);
  }
}