import { Test, TestingModule } from '@nestjs/testing';
import { ClickStatsController } from './click_stats.controller';
import { ClickStatsService } from './click_stats.service';

describe('ClickStatsController', () => {
  let controller: ClickStatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClickStatsController],
      providers: [ClickStatsService],
    }).compile();

    controller = module.get<ClickStatsController>(ClickStatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
