import { Test, TestingModule } from '@nestjs/testing';
import { DetailInformationController } from './detail-information.controller';
import { DetailInformationService } from './detail-information.service';

describe('DetailInformationController', () => {
  let controller: DetailInformationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetailInformationController],
      providers: [DetailInformationService],
    }).compile();

    controller = module.get<DetailInformationController>(DetailInformationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
