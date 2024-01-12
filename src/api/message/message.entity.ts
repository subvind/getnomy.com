import { Entity, PrimaryColumn, Column, BeforeInsert, Unique, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { v4 as uuidv4 } from 'uuid';

import { Session } from '../session/session.entity';
import { Channel } from '../channel/channel.entity';

@Entity()
// @Unique(['session', 'channel'])
export class Message {
  @PrimaryColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Hello World!', description: 'The plain text of the message' })
  @Column()
  text: string;

  /**
   * Other properties and relationships as needed
   */

  // session id
  @ManyToOne(() => Session, session => session.id)
  session: Session;

  // channel id
  @ManyToOne(() => Channel, channel => channel.id)
  channel: Channel;

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
