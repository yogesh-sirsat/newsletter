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
import { Subscriber } from '../../subscriber/entities/subscriber.entity';

@Entity('lists')
export class List {
  @ApiProperty({ description: 'The unique identifier of the list' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'The name of the list' })
  @Column('varchar')
  name: string;

  @ApiHideProperty()
  @ManyToMany(() => Subscriber, (subscriber) => subscriber.lists)
  @JoinTable()
  subscribers: Subscriber[];

  @ApiProperty({ description: 'The organization id the list belongs to' })
  @Column('uuid')
  organization_id: string;

  @ApiHideProperty()
  @ManyToOne(() => Organization)
  @JoinColumn({ name: 'organization_id' }) // Link to the organization_id column
  organization: Organization;

  @ApiProperty({
    description: 'The custom fields for the list',
  })
  @Column('jsonb', { nullable: true })
  custom_fields: Record<string, any>;

  @ApiProperty({
    description: 'The timestamp of when the list was created',
  })
  @CreateDateColumn()
  created_at: Date;
}
