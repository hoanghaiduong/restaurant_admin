import { Injectable } from '@nestjs/common';
import { CreateAdministrativeUnitDto } from './dto/create-administrative-unit.dto';
import { UpdateAdministrativeUnitDto } from './dto/update-administrative-unit.dto';

@Injectable()
export class AdministrativeUnitService {
  create(createAdministrativeUnitDto: CreateAdministrativeUnitDto) {
    return 'This action adds a new administrativeUnit';
  }

  findAll() {
    return `This action returns all administrativeUnit`;
  }

  findOne(id: number) {
    return `This action returns a #${id} administrativeUnit`;
  }

  update(id: number, updateAdministrativeUnitDto: UpdateAdministrativeUnitDto) {
    return `This action updates a #${id} administrativeUnit`;
  }

  remove(id: number) {
    return `This action removes a #${id} administrativeUnit`;
  }
}
