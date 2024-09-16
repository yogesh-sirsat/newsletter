import { Module } from '@nestjs/common';
import { SubscriberService } from './subscriber.service';
import { SubscriberController } from './subscriber.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from '../organization/entities/organization.entity';
import { Subscriber } from './entities/subscriber.entity';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [CommonModule, TypeOrmModule.forFeature([Subscriber, Organization])],
  controllers: [SubscriberController],
  providers: [SubscriberService],
})
export class SubscriberModule {}
