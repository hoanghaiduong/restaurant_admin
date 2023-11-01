import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UploadedFiles } from '@nestjs/common';
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
      name: 'idCard',
      maxCount: 2
    },
    {
      name: 'businessRegImages',
      maxCount: 3
    },
    {
      name: 'taxCodeImages',
      maxCount: 3
    },
    {
      name: 'relatedImages',
      maxCount: 5
    }
  ])
  async create(@Query('restaurantId') restaurantId: string, @Body() createRepresentativeInformationDto: CreateRepresentativeInformationDto, @UploadedFiles() files: {
    idCard: Express.Multer.File[],
    businessRegImages: Express.Multer.File[],
    taxCodeImages: Express.Multer.File[],
    relatedImages: Express.Multer.File[]
  }): Promise<RepresentativeInformation> {
    return await this.representativeInformationService.create(restaurantId,{
      ...createRepresentativeInformationDto,
      idCard: files.idCard,
      businessRegImages: files.businessRegImages,
      taxCodeImages: files.taxCodeImages,
      relatedImages: files.relatedImages
    });
  }

  @Get('gets')
  async findAll() {
    return this.representativeInformationService.findAll();
  }

  @Get('get')
  async findOne(@Query('id') id: string) {
    return await this.representativeInformationService.findOne(id);
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
