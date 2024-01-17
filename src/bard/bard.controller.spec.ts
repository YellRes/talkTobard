import { Test, TestingModule } from '@nestjs/testing';
import { BardController } from './bard.controller';
import { BardService } from './bard.service';

describe('BardController', () => {
  let controller: BardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BardController],
      providers: [BardService],
    }).compile();

    controller = module.get<BardController>(BardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
