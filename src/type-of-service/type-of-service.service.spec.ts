import { Test, TestingModule } from '@nestjs/testing';
import { TypeOfServiceService } from './type-of-service.service';

describe('TypeOfServiceService', () => {
  let service: TypeOfServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeOfServiceService],
    }).compile();

    service = module.get<TypeOfServiceService>(TypeOfServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
