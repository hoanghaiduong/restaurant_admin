import { Test, TestingModule } from '@nestjs/testing';
import { RepresentativeInformationService } from './representative-information.service';

describe('RepresentativeInformationService', () => {
  let service: RepresentativeInformationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RepresentativeInformationService],
    }).compile();

    service = module.get<RepresentativeInformationService>(RepresentativeInformationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
