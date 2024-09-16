import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { List } from './entities/list.entity';
import { RequestContextService } from '../common/request-context.service';

@Injectable()
export class ListsService {
  private readonly organization_id: string;

  constructor(
    private readonly requestContextService: RequestContextService,
    @InjectRepository(List)
    private readonly listRepository: Repository<List>,
  ) {
    this.organization_id = this.requestContextService.getOrganizationId();
  }

  async create(createListDto: CreateListDto): Promise<any> {
    if (this.organization_id !== createListDto.organization_id) {
      throw new ForbiddenException('Invalid organization access');
    }
    return this.listRepository.save(createListDto);
  }

  async findAll(): Promise<any> {
    return this.listRepository.find({
      where: { organization_id: this.organization_id },
    });
  }

  async update(id: string, updateListDto: UpdateListDto): Promise<any> {
    const list = await this.listRepository.preload({
      id,
      ...updateListDto,
    });

    if (!list) {
      throw new NotFoundException(`List with ID ${id} not found`);
    }

    const organization_id = this.requestContextService.getOrganizationId();
    if (organization_id !== list.organization_id) {
      throw new ForbiddenException('Invalid organization access');
    }

    return this.listRepository.save(list);
  }
}
