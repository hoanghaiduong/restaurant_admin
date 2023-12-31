import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BusinessModelService } from './business-model.service';
import { CreateBusinessModelDto } from './dto/create-business-model.dto';
import { UpdateBusinessModelDto } from './dto/update-business-model.dto';
import { BaseController } from 'src/base/base.controller';
import { BusinessModel } from './entities/business-model.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('business-model')
@ApiTags("API Loại hình doanh nghiệp")
export class BusinessModelController extends BaseController<BusinessModel>{
  constructor(private readonly businessModelService: BusinessModelService) {super(businessModelService) }
  
}
