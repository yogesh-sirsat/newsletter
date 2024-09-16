import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Campaign } from '../../campaign/entities/campaign.entity';

@Entity('click_stats')
export class ClickStat {
  @ApiProperty({ description: 'The unique identifier of the click stat' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'The campaign id the click stat belongs to' })
  @Column('uuid')
  campaign_id: string;

  @ApiHideProperty()
  @ManyToOne(() => Campaign)
  @JoinColumn({ name: 'campaign_id' }) // Link to the campaign_id column
  campaign: Campaign;

  @ApiProperty({ description: 'The URL of clicked link' })
  @Column('varchar')
  link: string;

  @ApiProperty({ description: 'The number of clicks' })
  @Column('integer')
  clicks: number;

  @ApiProperty({
    description: 'The timestamp of when the click stat was created',
  })
  @CreateDateColumn()
  created_at: Date;
}
