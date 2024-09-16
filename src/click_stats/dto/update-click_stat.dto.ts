import { PartialType } from '@nestjs/swagger';
import { CreateClickStatDto } from './create-click_stat.dto';

export class UpdateClickStatDto extends PartialType(CreateClickStatDto) {}
