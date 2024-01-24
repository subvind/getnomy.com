import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

import { compare } from 'bcrypt';
import * as mailgun from 'mailgun-js';

@Injectable()
export class UserService {
  private readonly mg;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    this.mg = mailgun({
      apiKey: process.env.MAILGUN_API_KEY || '123',
      domain: process.env.MAILGUN_DOMAIN || '123',
    });
  }
  
  getHello(): string {
    return 'Hello World!';
  }
  
  async findAll(page: number, limit: number, search?: string): Promise<{ data: User[]; total: number }> {
    const query = this.userRepository.createQueryBuilder('user');
  
    if (search) {
      query.where(
        '(user.username LIKE :search',
        { search: `%${search}%` }
      );
    }
  
    query.leftJoinAndSelect('user.contact', 'contact');
    
    const offset = (page - 1) * limit;
  
    const [data, total] = await query.skip(offset).take(limit).getManyAndCount();
  
    return { data, total };
  }

  async findRecord(id: string): Promise<User> {
    return this.userRepository.findOne({ 
      where: {
        id: id
      },
      relations: ['contact'],
      select: ['id', 'username', 'password', 'authStatus', 'recoverPasswordToken', 'createdAt']
    });
  }

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOne({ 
      where: {
        id: id
      },
      relations: ['contact'],
      select: ['id', 'username', 'authStatus', 'recoverPasswordToken', 'createdAt']
    });
  }

  async findByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ 
      where: {
        username: username
      },
      relations: [
        'contact',
      ]
    });
  }

  async create(user: User): Promise<User> {
    const newObject = this.userRepository.create(user);
    return this.userRepository.save(newObject);
  }

  async update(id: string, user: User): Promise<User> {
    await this.userRepository.update(id, user);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async verifyPassword(user: User, password: string): Promise<boolean> {
    return compare(password, user.password);
  }

  async sendPasswordRevocery(email: string, recoverPasswordToken: string): Promise<void> {
    const data = {
      from: 'subscribers@getnomy.com', // Replace with your sender email
      to: email,
      subject: 'Password Recovery - nomy.GET',
      text: `Copy/paste the following token to verify this email: ${recoverPasswordToken}`,
    };

    try {
      await this.mg.messages().send(data);
      console.log('Verification email sent successfully');
    } catch (error) {
      console.error('Error sending verification email:', error);
      throw error;
    }
  }
}