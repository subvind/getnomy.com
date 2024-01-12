import { Entity, PrimaryColumn, Column, BeforeInsert, Unique, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { v4 as uuidv4 } from 'uuid';

import { Message } from '../message/message.entity';

@Entity()
@Unique(['externalId']) 
export class Session {
  @PrimaryColumn('uuid')
  id: string;

  @ApiProperty({ example: 'John Doe', description: 'The name that should display to other sessions for id' })
  @Column()
  displayName: string;

  @ApiProperty({ example: '001', description: 'The id that is used to identify this session externally' })
  @Column()
  externalId: string;

  /**
   * Other properties and relationships as needed
   */

  // messages
  @OneToMany(() => Message, message => message.session, { nullable: true })
  messages: Message[]

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @BeforeInsert()
  generateUUID() {
    if (!this.id) {
      this.id = uuidv4();
    }
    console.log('oneTimePad insert', this.id)
  }
}
