import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Organization } from '../../organization/entities/organization.entity';
import { Exclude } from 'class-transformer';

export enum UserRole {
  SUPERADMIN = 'superadmin',
  ADMIN = 'admin',
  USER = 'user',
}

@Entity('users')
export class User {
  @ApiProperty({ description: 'The unique identifier of the user' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'The email address of the user' })
  @Column('varchar', { unique: true })
  email: string;

  @ApiHideProperty()
  @Column()
  @Exclude()
  password_hash: string;

  @ApiProperty({ description: 'The organization id the user belongs to' })
  @Column('uuid')
  organization_id: string;

  @ApiHideProperty()
  @ManyToOne(() => Organization)
  @JoinColumn({ name: 'organization_id' }) // Link to the organization_id column
  organization: Organization;

  @ApiProperty({ enum: UserRole, description: 'The role of the user' })
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @ApiProperty({ description: 'The timestamp of when the user was created' })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({
    description: 'The timestamp of when the user was last updated',
  })
  @UpdateDateColumn()
  updated_at: Date;
}
