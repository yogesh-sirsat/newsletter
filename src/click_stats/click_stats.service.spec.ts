import { Test, TestingModule } from '@nestjs/testing';
import { ClickStatsService } from './click_stats.service';

describe('ClickStatsService', () => {
  let service: ClickStatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClickStatsService],
    }).compile();

    service = module.get<ClickStatsService>(ClickStatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
