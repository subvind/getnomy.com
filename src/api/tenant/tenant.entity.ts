import { Entity, PrimaryColumn, Column, BeforeInsert, Unique, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { v4 as uuidv4 } from 'uuid';

import { Community } from '../community/community.entity';
// import { Peer } from '../peer/peer.entity';
// import { Message } from '../message/message.entity';

@Entity()
@Unique(['slug'])
export class Tenant {
  @PrimaryColumn('uuid')
  id: string;

  @ApiProperty({ example: '', description: 'A string that represents this tenant' })
  @Column({ default: 'hello-world'})
  slug: string;

  @ApiProperty({ example: '', description: 'A string that describes this tenant' })
  @Column({ default: 'This is an example description here.'})
  description: string;

  /**
   * Other properties and relationships as needed
   */

  // community id
  @ManyToOne(() => Community, community => community.id)
  community: Community;

  // // peers
  // @OneToMany(() => Peer, peer => peer.tenant, { nullable: true })
  // peers: Peer[]

  // // messages
  // @OneToMany(() => Message, message => message.tenant, { nullable: true })
  // messages: Message[]

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @BeforeInsert()
  generateUUID() {
    if (!this.id) {
      this.id = uuidv4();
    }
    console.log('tenant insert', this.id)
  }
}
