import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DistrictService } from './district.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { ApiTags } from '@nestjs/swagger';
import { District } from './entities/district.entity';
import { Pagination } from 'src/common/pagination/pagination.dto';
import { PaginationModel } from 'src/common/pagination/pagination.model';

@Controller('district')
@ApiTags("API Quận Huyện")
export class DistrictController {
  constructor(private readonly districtService: DistrictService) { }
  @Get('getDistrictByProvinceId')
  async getDistrictByProvince(@Query('province_code') province_code: string, @Query() pagination: Pagination): Promise<PaginationModel<District>> {
    return await this.districtService.getListDistrictsByProvince(province_code, pagination);
  }
}
