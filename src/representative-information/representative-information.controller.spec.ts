import { Test, TestingModule } from '@nestjs/testing';
import { RepresentativeInformationController } from './representative-information.controller';
import { RepresentativeInformationService } from './representative-information.service';

describe('RepresentativeInformationController', () => {
  let controller: RepresentativeInformationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RepresentativeInformationController],
      providers: [RepresentativeInformationService],
    }).compile();

    controller = module.get<RepresentativeInformationController>(RepresentativeInformationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
