import { Entity, PrimaryColumn, Column, BeforeInsert, Unique, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { v4 as uuidv4 } from 'uuid';

import { Tenant } from '../tenant/tenant.entity';
// import { Peer } from '../peer/peer.entity';
// import { Message } from '../message/message.entity';

@Entity()
@Unique(['slug'])
export class Community {
  @PrimaryColumn('uuid')
  id: string;

  @ApiProperty({ example: '', description: 'A string that represents this community' })
  @Column({ default: 'hello-world'})
  slug: string;

  @ApiProperty({ example: '', description: 'A string that describes this community' })
  @Column({ default: 'This is an example description here.'})
  description: string;

  /**
   * Other properties and relationships as needed
   */

  // tenants
  @OneToMany(() => Tenant, tenant => tenant.community, { nullable: true })
  tenants: Tenant[]

  // // peers
  // @OneToMany(() => Peer, peer => peer.community, { nullable: true })
  // peers: Peer[]

  // // messages
  // @OneToMany(() => Message, message => message.community, { nullable: true })
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
    console.log('community insert', this.id)
  }
}
