import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscriber } from './entities/subscriber.entity';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { RequestContextService } from '../common/request-context.service';

@Injectable()
export class SubscriberService {
  private readonly organization_id: string;

  constructor(
    private readonly requestContextService: RequestContextService,
    @InjectRepository(Subscriber)
    private readonly subscriberRepository: Repository<Subscriber>,
  ) {
    this.organization_id = this.requestContextService.getOrganizationId();
  }

  async create(createSubscriberDto: CreateSubscriberDto): Promise<Subscriber> {
    if (this.organization_id !== createSubscriberDto.organization_id) {
      throw new ForbiddenException('Invalid organization access');
    }
    const subscriber = this.subscriberRepository.create(createSubscriberDto);
    return await this.subscriberRepository.save(subscriber);
  }

  async findAll({
    page = 1,
    limit = 10,
    email,
  }: {
    page?: number;
    limit?: number;
    email?: string;
  }): Promise<Subscriber[]> {
    const queryBuilder =
      this.subscriberRepository.createQueryBuilder('subscriber');

    if (email) {
      queryBuilder.andWhere('subscriber.email = :email', { email });
    }
    const organization_id = this.organization_id;
    if (organization_id) {
      queryBuilder.andWhere('subscriber.organization_id = :organization_id', {
        organization_id,
      });
    }

    queryBuilder.skip((page - 1) * limit).take(limit);

    return await queryBuilder.getMany();
  }

  async update(
    id: string,
    updateSubscriberDto: UpdateSubscriberDto,
  ): Promise<Subscriber> {
    const subscriber = await this.subscriberRepository.preload({
      id,
      ...updateSubscriberDto,
    });

    if (!subscriber) {
      throw new NotFoundException(`Subscriber with ID ${id} not found`);
    }

    if (subscriber.organization_id !== this.organization_id) {
      throw new ForbiddenException('Invalid organization access');
    }

    return await this.subscriberRepository.save(subscriber);
  }
}
