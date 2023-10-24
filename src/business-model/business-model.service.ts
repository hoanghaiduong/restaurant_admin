import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateBusinessModelDto } from './dto/create-business-model.dto';
import { UpdateBusinessModelDto } from './dto/update-business-model.dto';
import { BaseService } from 'src/base/base.service';
import { BusinessModel } from './entities/business-model.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BusinessModelService extends BaseService<BusinessModel> implements OnModuleInit {
  constructor(@InjectRepository(BusinessModel) private businessRepository: Repository<BusinessModel>) {
    super(businessRepository)
  }
  async onModuleInit(): Promise<void> {
    const businessModels = [
      { name: 'Dịch vụ tiệc trong', description: 'Dịch vụ nấu ăn và tổ chức tiệc tại nhà hàng' },
      { name: 'Dịch vụ tiệc ngoài', description: 'Dịch vụ nấu ăn và tổ chức tiệc tại tư gia' },
    ];
    await this.initialData(businessModels as any);
  }
  async findOneByName(name: string): Promise<BusinessModel> {
    const businessModel = await this.businessRepository.findOne({
      where: {
        name
      }
    })
    if (!businessModel) throw new NotFoundException('Loại hình nhà hàng không tồn tại !');
    return businessModel;
  }
}
