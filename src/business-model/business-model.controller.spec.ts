import { Test, TestingModule } from '@nestjs/testing';
import { BusinessModelController } from './business-model.controller';
import { BusinessModelService } from './business-model.service';

describe('BusinessModelController', () => {
  let controller: BusinessModelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessModelController],
      providers: [BusinessModelService],
    }).compile();

    controller = module.get<BusinessModelController>(BusinessModelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
