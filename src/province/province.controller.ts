import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProvinceService } from './province.service';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';
import { ApiTags } from '@nestjs/swagger';
import { PaginationModel } from 'src/common/pagination/pagination.model';
import { Pagination } from 'src/common/pagination/pagination.dto';
import { Province } from './entities/province.entity';

@Controller('province')
@ApiTags("API Tỉnh Thành")
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) { }

  @Get('getListProvince')
  async getListProvince(@Query() pagination: Pagination): Promise<PaginationModel<Province>> {
    return await this.provinceService.getAll(pagination);
  }
 
  // @Post()
  // create(@Body() createProvinceDto: CreateProvinceDto) {
  //   return this.provinceService.create(createProvinceDto);
  // }

  // @Get()
  // findAll() {
  //   return this.provinceService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.provinceService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProvinceDto: UpdateProvinceDto) {
  //   return this.provinceService.update(+id, updateProvinceDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.provinceService.remove(+id);
  // }
}
