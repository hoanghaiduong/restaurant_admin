import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFiles } from '@nestjs/common';
import { DetailInformationService } from './detail-information.service';
import { CreateDetailInformationDto } from './dto/create-detail-information.dto';
import { UpdateDetailInformationDto } from './dto/update-detail-information.dto';
import { ApiTags } from '@nestjs/swagger';
import { DetailInformation } from './entities/detail-information.entity';
import { ApiMultipleFieldFiles } from 'src/common/decorators/file.decorator';

@Controller('detail-information')
@ApiTags("API thông tin chi tiết nhà hàng (bước 3)")
export class DetailInformationController {
  constructor(private readonly detailInformationService: DetailInformationService) { }

  @Post('create')
  @ApiMultipleFieldFiles([
    {
      name: 'avatar',//ảnh đại diện
      maxCount: 1
    },
    {
      name: 'coverImage',// ảnh bìa
      maxCount: 1
    },
    {
      name: 'facadeImage',// ảnh mặt tiền
      maxCount: 1
    },
    {
      name: 'menuImages',
      maxCount: 5
    }
  ])
  async create(@Body() dto: CreateDetailInformationDto, @UploadedFiles() files: {
    avatar: Express.Multer.File,
    coverImage: Express.Multer.File,
    facadeImage: Express.Multer.File,
    menuImages: Express.Multer.File[]
  }): Promise<DetailInformation> {
    return await this.detailInformationService.create({
      ...dto,
      avatar: files?.avatar[0],
      coverImage: files?.coverImage[0],
      facadeImage: files?.facadeImage[0],
      menuImages: files.menuImages
    });
  }

  @Get()
  findAll() {
    return this.detailInformationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detailInformationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetailInformationDto: UpdateDetailInformationDto) {
    return this.detailInformationService.update(+id, updateDetailInformationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detailInformationService.remove(+id);
  }
}
