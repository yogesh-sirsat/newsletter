import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Organization } from '../../organization/entities/organization.entity';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { List } from '../../lists/entities/list.entity';

@Entity('subscribers')
export class Subscriber {
  @ApiProperty({ description: 'The unique identifier of the subscriber' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'The email address of the subscriber' })
  @Column('varchar')
  email: string;

  @ApiHideProperty()
  @ManyToMany(() => List, (list) => list.subscribers)
  @JoinTable()
  lists: List[];

  @ApiProperty({ description: 'The organization id the subscriber belongs to' })
  @Column('uuid')
  organization_id: string;

  @ApiHideProperty()
  @ManyToOne(() => Organization)
  @JoinColumn({ name: 'organization_id' }) // Link to the organization_id column
  organization: Organization;

  @ApiProperty({
    description: 'The custom fields for the subscriber',
  })
  @Column('jsonb', { nullable: true })
  custom_fields: Record<string, any>;

  @ApiProperty({
    description: 'The GPG public key for the subscriber',
  })
  @Column('text', { nullable: true })
  gpg_public_key: string;

  @ApiProperty({
    description: 'The timestamp of when the subscriber was created',
  })
  @CreateDateColumn()
  created_at: Date;
}
