import { Entity, PrimaryColumn, Column, BeforeInsert, Unique, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { v4 as uuidv4 } from 'uuid';

import { Message } from '../message/message.entity';

@Entity()
@Unique(['slug'])
export class Channel {
  @PrimaryColumn('uuid')
  id: string;

  @ApiProperty({ example: '', description: 'A string that represents this channel' })
  @Column({ default: 'hello-world'})
  slug: string;

  @ApiProperty({ example: '', description: 'A string that describes this channel' })
  @Column({ default: 'say hello to the world.'})
  description: string;

  /**
   * Other properties and relationships as needed
   */

  // messages
  @OneToMany(() => Message, message => message.channel, { nullable: true })
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
    console.log('category insert', this.id)
  }
}
