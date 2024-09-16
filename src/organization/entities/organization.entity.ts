import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('organizations')
export class Organization {
  @ApiProperty({ description: 'The unique identifier of the organization' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'The name of the organization' })
  @Column('varchar')
  name: string;

  @ApiProperty({
    description: 'The timestamp of when the organization was created',
  })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({
    description: 'The timestamp of when the organization was last updated',
  })
  @UpdateDateColumn()
  updated_at: Date;
}
