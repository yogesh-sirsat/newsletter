import { Module } from '@nestjs/common';
import { ClickStatsService } from './click_stats.service';
import { ClickStatsController } from './click_stats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campaign } from '../campaign/entities/campaign.entity';
import { ClickStat } from './entities/click_stat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClickStat, Campaign])],
  controllers: [ClickStatsController],
  providers: [ClickStatsService],
})
export class ClickStatsModule {}
