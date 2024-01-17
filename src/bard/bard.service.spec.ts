import { Test, TestingModule } from '@nestjs/testing';
import { BardService } from './bard.service';

describe('BardService', () => {
  let service: BardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BardService],
    }).compile();

    service = module.get<BardService>(BardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
