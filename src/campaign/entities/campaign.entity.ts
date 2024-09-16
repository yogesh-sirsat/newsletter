import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Organization } from '../../organization/entities/organization.entity';
import { List } from '../../lists/entities/list.entity';

@Entity('campaigns')
export class Campaign {
  @ApiProperty({ description: 'The unique identifier of the campaign' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'The email subject of the campaign' })
  @Column('varchar')
  subject: string;

  @ApiProperty({ description: 'The email content of the campaign' })
  @Column('text')
  content: string;

  @ApiProperty({ description: 'The list id the the campaign belongs to' })
  @Column('uuid')
  list_id: string;

  @ApiHideProperty()
  @ManyToOne(() => List)
  @JoinColumn({ name: 'list_id' }) // Link to the list_id column
  list: List;

  @ApiProperty({ description: 'The organization id the campaign belongs to' })
  @Column('uuid')
  organization_id: string;

  @ApiHideProperty()
  @ManyToOne(() => Organization)
  @JoinColumn({ name: 'organization_id' }) // Link to the organization_id column
  organization: Organization;

  @ApiProperty({
    description: 'The timestamp of when the campaign was created',
  })
  @CreateDateColumn()
  created_at: Date;
}
