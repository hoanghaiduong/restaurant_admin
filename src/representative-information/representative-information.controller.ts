import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RepresentativeInformationService } from './representative-information.service';
import { CreateRepresentativeInformationDto } from './dto/create-representative-information.dto';
import { UpdateRepresentativeInformationDto } from './dto/update-representative-information.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiMultipleFieldFiles } from 'src/common/decorators/file.decorator';
import { RepresentativeInformation } from './entities/representative-information.entity';

@Controller('representative-information')
@ApiTags("API Đăng ký thông tin người đại diện thuộc nhà hàng (bước 1)")
export class RepresentativeInformationController {
  constructor(private readonly representativeInformationService: RepresentativeInformationService) { }

  @Post()
  @ApiMultipleFieldFiles([
    {
      name: null,
      maxCount: 2
    }
  ])
  async create(@Query('restaurantId') restaurantId: string, @Body() createRepresentativeInformationDto: CreateRepresentativeInformationDto): Promise<RepresentativeInformation> {
    return await this.representativeInformationService.create(createRepresentativeInformationDto);
  }

  @Get()
  findAll() {
    return this.representativeInformationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.representativeInformationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRepresentativeInformationDto: UpdateRepresentativeInformationDto) {
    return this.representativeInformationService.update(+id, updateRepresentativeInformationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.representativeInformationService.remove(+id);
  }
}
