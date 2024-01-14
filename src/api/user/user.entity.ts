import { Entity, PrimaryColumn, Column, BeforeInsert, Unique, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { v4 as uuidv4 } from 'uuid';

import { hash } from 'bcrypt';

import { Contact } from '../contact/contact.entity';
import { Session } from '../session/session.entity';

@Entity()
@Unique(['username']) 
export class User {
  @PrimaryColumn('uuid')
  id: string;

  @ApiProperty({ example: 'test', description: 'The username of the user' })
  @Column()
  username: string;

  @ApiProperty({ example: 'jd2023', description: 'The secret password of the user' })
  @Column({ select: false }) // Exclude 'password' from default selection
  password: string;

  /**
   * Other properties and relationships as needed
   */

  // contact id
  @OneToOne(() => Contact, { eager: true, cascade: true })
  @JoinColumn()
  contact: Contact;
  
  // sessions
  @OneToMany(() => Session, session => session.user, { nullable: true })
  sessions: Session[]
  
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @BeforeInsert()
  generateUUID() {
    if (!this.id) {
      this.id = uuidv4();
    }
    console.log('user insert', this.id)
  }

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
