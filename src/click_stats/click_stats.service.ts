import { Injectable } from '@nestjs/common';
import { CreateClickStatDto } from './dto/create-click_stat.dto';
import { UpdateClickStatDto } from './dto/update-click_stat.dto';

@Injectable()
export class ClickStatsService {
  create(createClickStatDto: CreateClickStatDto) {
    return 'This action adds a new clickStat';
  }

  findAll() {
    return `This action returns all clickStats`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clickStat`;
  }

  update(id: number, updateClickStatDto: UpdateClickStatDto) {
    return `This action updates a #${id} clickStat`;
  }

  remove(id: number) {
    return `This action removes a #${id} clickStat`;
  }
}
