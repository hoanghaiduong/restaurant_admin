import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdministrativeUnitService } from './administrative-unit.service';
import { CreateAdministrativeUnitDto } from './dto/create-administrative-unit.dto';
import { UpdateAdministrativeUnitDto } from './dto/update-administrative-unit.dto';

@Controller('administrative-unit')
export class AdministrativeUnitController {
  constructor(private readonly administrativeUnitService: AdministrativeUnitService) {}

  // @Post()
  // create(@Body() createAdministrativeUnitDto: CreateAdministrativeUnitDto) {
  //   return this.administrativeUnitService.create(createAdministrativeUnitDto);
  // }

  // @Get()
  // findAll() {
  //   return this.administrativeUnitService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.administrativeUnitService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAdministrativeUnitDto: UpdateAdministrativeUnitDto) {
  //   return this.administrativeUnitService.update(+id, updateAdministrativeUnitDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.administrativeUnitService.remove(+id);
  // }
}
