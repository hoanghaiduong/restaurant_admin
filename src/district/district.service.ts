import { Injectable } from '@nestjs/common';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { District } from './entities/district.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meta } from 'src/common/pagination/meta.dto';
import { Pagination } from 'src/common/pagination/pagination.dto';
import { PaginationModel } from 'src/common/pagination/pagination.model';

@Injectable()
export class DistrictService {
  constructor(@InjectRepository(District) private districtRepository: Repository<District>) {

  }
  async getListDistrictsByProvince(province_code: string, pagination: Pagination): Promise<PaginationModel<District>> {
    const queryBuilder = this.districtRepository
      .createQueryBuilder('districts')
      .take(pagination.take)
      .skip(pagination.skip)
      .where('province_code = :province_code', { province_code })
      .orderBy('province_code', pagination.order);

    if (pagination.search) {
      queryBuilder.andWhere('name ILIKE :search', { search: `%${pagination.search}%` });
    }

    const [entities, itemCount] = await queryBuilder
      .getManyAndCount();

    const meta = new Meta({ itemCount, pagination });
    return new PaginationModel<District>(entities, meta);
  }

}
