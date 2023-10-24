import { Injectable } from '@nestjs/common';
import { CreateWardDto } from './dto/create-ward.dto';
import { UpdateWardDto } from './dto/update-ward.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ward } from './entities/ward.entity';
import { Repository } from 'typeorm';
import { Pagination } from 'src/common/pagination/pagination.dto';
import { PaginationModel } from 'src/common/pagination/pagination.model';
import { Meta } from 'src/common/pagination/meta.dto';

@Injectable()
export class WardService {
  constructor(@InjectRepository(Ward) private wardsRepository: Repository<Ward>) {

  }

  async getWardsByDistrictCode(district_code: string, pagination: Pagination): Promise<PaginationModel<Ward>> {
    const queryBuilder = this.wardsRepository.createQueryBuilder('wards')
      .skip(pagination.skip)
      .take(pagination.take)
      .orderBy('code', pagination.order)
      .where('district_code = :district_code', { district_code });
    if (pagination.search) {
      queryBuilder.andWhere('name ILIKE :search', { search: `%${pagination.search}%` })
    }
    const [entities, itemCount] = await queryBuilder.getManyAndCount();
    const meta = new Meta({ itemCount, pagination });
    return new PaginationModel<Ward>(entities, meta);
  }
}
