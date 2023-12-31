import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TypeOfServiceService } from './type-of-service.service';
import { CreateTypeOfServiceDto } from './dto/create-type-of-service.dto';
import { UpdateTypeOfServiceDto } from './dto/update-type-of-service.dto';
import { BaseController } from 'src/base/base.controller';
import { TypeOfService } from './entities/type-of-service.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('type-of-service')
@ApiTags("API Loại Dịch Vụ")
export class TypeOfServiceController extends BaseController<TypeOfService>{
  constructor(private typeOfServiceService: TypeOfServiceService) {
    super(typeOfServiceService)
  }

}
