import { Module } from '@nestjs/common';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from '../organization/entities/organization.entity';
import { List } from './entities/list.entity';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [CommonModule, TypeOrmModule.forFeature([List, Organization])],
  controllers: [ListsController],
  providers: [ListsService],
})
export class ListsModule {}
