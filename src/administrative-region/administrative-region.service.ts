import { Injectable } from '@nestjs/common';
import { CreateAdministrativeRegionDto } from './dto/create-administrative-region.dto';
import { UpdateAdministrativeRegionDto } from './dto/update-administrative-region.dto';

@Injectable()
export class AdministrativeRegionService {
  create(createAdministrativeRegionDto: CreateAdministrativeRegionDto) {
    return 'This action adds a new administrativeRegion';
  }

  findAll() {
    return `This action returns all administrativeRegion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} administrativeRegion`;
  }

  update(id: number, updateAdministrativeRegionDto: UpdateAdministrativeRegionDto) {
    return `This action updates a #${id} administrativeRegion`;
  }

  remove(id: number) {
    return `This action removes a #${id} administrativeRegion`;
  }
}
