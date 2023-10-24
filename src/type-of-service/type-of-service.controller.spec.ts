import { Test, TestingModule } from '@nestjs/testing';
import { TypeOfServiceController } from './type-of-service.controller';
import { TypeOfServiceService } from './type-of-service.service';

describe('TypeOfServiceController', () => {
  let controller: TypeOfServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeOfServiceController],
      providers: [TypeOfServiceService],
    }).compile();

    controller = module.get<TypeOfServiceController>(TypeOfServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
