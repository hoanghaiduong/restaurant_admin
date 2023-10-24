import { Test, TestingModule } from '@nestjs/testing';
import { DetailInformationService } from './detail-information.service';

describe('DetailInformationService', () => {
  let service: DetailInformationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetailInformationService],
    }).compile();

    service = module.get<DetailInformationService>(DetailInformationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
