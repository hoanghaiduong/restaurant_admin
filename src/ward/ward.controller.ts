import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { WardService } from './ward.service';
import { CreateWardDto } from './dto/create-ward.dto';
import { UpdateWardDto } from './dto/update-ward.dto';
import { ApiTags } from '@nestjs/swagger';
import { Pagination } from 'src/common/pagination/pagination.dto';
import { PaginationModel } from 'src/common/pagination/pagination.model';
import { Ward } from './entities/ward.entity';

@Controller('ward')
@ApiTags("API Phường xã")
export class WardController {
  constructor(private readonly wardService: WardService) { }

  @Get('district/ward')
  async getListWardByDistrictCode(@Query('district_code') district_code: string, @Query() pagination: Pagination): Promise<PaginationModel<Ward>> {
    return await this.wardService.getWardsByDistrictCode(district_code, pagination);
  }
}
