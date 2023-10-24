import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdministrativeRegionService } from './administrative-region.service';
import { CreateAdministrativeRegionDto } from './dto/create-administrative-region.dto';
import { UpdateAdministrativeRegionDto } from './dto/update-administrative-region.dto';

@Controller('administrative-region')
export class AdministrativeRegionController {
  constructor(private readonly administrativeRegionService: AdministrativeRegionService) {}

  @Post()
  create(@Body() createAdministrativeRegionDto: CreateAdministrativeRegionDto) {
    return this.administrativeRegionService.create(createAdministrativeRegionDto);
  }

  @Get()
  findAll() {
    return this.administrativeRegionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.administrativeRegionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdministrativeRegionDto: UpdateAdministrativeRegionDto) {
    return this.administrativeRegionService.update(+id, updateAdministrativeRegionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.administrativeRegionService.remove(+id);
  }
}
