import { BadRequestException, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateTypeOfServiceDto } from './dto/create-type-of-service.dto';
import { UpdateTypeOfServiceDto } from './dto/update-type-of-service.dto';
import { BaseService } from 'src/base/base.service';
import { TypeOfService } from './entities/type-of-service.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, QueryRunner, Repository, Transaction, getManager } from 'typeorm';

@Injectable()
export class TypeOfServiceService extends BaseService<TypeOfService> implements OnModuleInit {
  constructor(@InjectRepository(TypeOfService) private typeOfServiceRepository: Repository<TypeOfService>) {
    super(typeOfServiceRepository)
  }
  async onModuleInit(): Promise<void> {
    const data = [
      { name: 'Chụp hình cưới', description: '', businessModelId: 'e7d9cfd9-04b7-4260-b1b5-116c7077ca56' },
      { name: 'Âm thanh ánh sáng', description: '' },
      { name: 'Cho thuê bàn ghế', description: '' },
      { name: 'Cho thuê vật tư', description: '' },
      { name: 'Áo cưới/Trang phục lễ', description: '' },
      { name: 'Hoa cưới/Hoa lễ', description: '' },
      { name: 'Trang Điểm', description: '' },
    ];
    await this.initialData(data as TypeOfService[]);
  }
  async findByIds(ids: string[]): Promise<TypeOfService[]> {
    const queryRunner: QueryRunner = this.typeOfServiceRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {

      for (const id of ids) {

        const typeOfService = await this.typeOfServiceRepository.findOne({
          where: { id }
        });
        if (!typeOfService) {
          await queryRunner.rollbackTransaction();
          throw new BadRequestException(`Invalid type of service ID: ${id}`);
        }
      }

      await queryRunner.commitTransaction();
      return this.typeOfServiceRepository.findByIds(ids);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      queryRunner.release();
    }
  }
}


