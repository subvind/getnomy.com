import { Entity, PrimaryColumn, Column, BeforeInsert, Unique, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { v4 as uuidv4 } from 'uuid';

import { User } from '../user/user.entity';

@Entity()
@Unique(['emailAddress'])
@Unique(['phoneNumber'])
export class Contact {
  @PrimaryColumn('uuid')
  id: string;

  // Reference to the owning side entity (User)
  // No specific relationship decorator is needed here
  user: User;

  @ApiProperty({ example: 'travis.burandt@gmail.com', description: 'The email address of the contact' })
  @Column()
  emailAddress: string;

  @ApiProperty({ example: '2817980497', description: 'The phone number of the contact' })
  @Column()
  phoneNumber: string;

  /**
   * Other properties and relationships as needed
   */

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @BeforeInsert()
  generateUUID() {
    if (!this.id) {
      this.id = uuidv4();
    }
    console.log('contact insert', this.id)
  }
}
