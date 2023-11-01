import { Injectable } from '@nestjs/common';
import { CreateRepresentativeInformationDto } from './dto/create-representative-information.dto';
import { UpdateRepresentativeInformationDto } from './dto/update-representative-information.dto';
import { RepresentativeInformation } from './entities/representative-information.entity';

@Injectable()
export class RepresentativeInformationService {
  async create(restaurantId:string,createRepresentativeInformationDto: CreateRepresentativeInformationDto): Promise<RepresentativeInformation> {
    return;
  }

  findAll() {
    return `This action returns all representativeInformation`;
  }

 async findOne(id: string) :Promise<RepresentativeInformation> {
  return;
  }

  update(id: number, updateRepresentativeInformationDto: UpdateRepresentativeInformationDto) {
    return `This action updates a #${id} representativeInformation`;
  }

  remove(id: number) {
    return `This action removes a #${id} representativeInformation`;
  }
}
