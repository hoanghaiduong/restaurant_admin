import { Injectable } from '@nestjs/common';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';
import { Province } from './entities/province.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Pagination } from 'src/common/pagination/pagination.dto';
import { PaginationModel } from 'src/common/pagination/pagination.model';
import { Meta } from 'src/common/pagination/meta.dto';

@Injectable()
export class ProvinceService {
  constructor(@InjectRepository(Province) private provinceRepository: Repository<Province>) {

  }

  async getAll(pagination: Pagination): Promise<PaginationModel<Province>> {
    const [entities, itemCount] = await this.provinceRepository.findAndCount({
      skip: pagination.skip,
      take: pagination.take,
      where: {
        name: pagination.search ? ILike(`%${pagination.search}%`) : null
      },
      order: {
        code: pagination.order
      },

    })

    const meta = new Meta({ itemCount, pagination });
    return new PaginationModel<Province>(entities, meta);
  }


}
