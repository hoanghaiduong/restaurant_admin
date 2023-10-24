import { Injectable } from '@nestjs/common';
import { CreateDetailInformationDto } from './dto/create-detail-information.dto';
import { UpdateDetailInformationDto } from './dto/update-detail-information.dto';

@Injectable()
export class DetailInformationService {
  create(createDetailInformationDto: CreateDetailInformationDto) {
    return 'This action adds a new detailInformation';
  }

  findAll() {
    return `This action returns all detailInformation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detailInformation`;
  }

  update(id: number, updateDetailInformationDto: UpdateDetailInformationDto) {
    return `This action updates a #${id} detailInformation`;
  }

  remove(id: number) {
    return `This action removes a #${id} detailInformation`;
  }
}
