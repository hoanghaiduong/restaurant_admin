import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDetailInformationDto } from './dto/create-detail-information.dto';
import { UpdateDetailInformationDto } from './dto/update-detail-information.dto';
import { DetailInformation } from './entities/detail-information.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { StorageService } from 'src/storage/storage.service';
import { ImageTypes } from 'src/common/enum/file';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import *  as fs from 'fs'

@Injectable()
export class DetailInformationService {
  constructor(@InjectRepository(DetailInformation) private detailInformationRepository: Repository<DetailInformation>, private restaurantService: RestaurantService, private storageService: StorageService, private configService: ConfigService) {

  }
  async create(dto: CreateDetailInformationDto): Promise<DetailInformation> {
    try {
      const restaurant = await this.restaurantService.findOne(dto.restaurantId);
      const basePath = join('.', this.configService.get<string>('FOLDER_UPLOAD'));
      const restaurantUploadPath = join(basePath, ImageTypes.CARD_RESTAURANT_DETAIL_INFORMATION);
      if (!fs.existsSync(basePath)) {
        fs.mkdirSync(basePath);
      }

      if (!fs.existsSync(restaurantUploadPath)) {
        fs.mkdirSync(restaurantUploadPath);
      }

      let avatarPromise = this.storageService.uploadFile(`${ImageTypes.CARD_RESTAURANT_DETAIL_INFORMATION}/${ImageTypes.CARD_RESTAURANT_DETAIL_INFORMATION_AVATAR}`, dto.avatar);

      let coverImagePromise = this.storageService.uploadFile(`${ImageTypes.CARD_RESTAURANT_DETAIL_INFORMATION}/${ImageTypes.CARD_RESTAURANT_DETAIL_INFORMATION_COVER_IMAGE}`, dto.coverImage);

      let facadeImagePromise = this.storageService.uploadFile(`${ImageTypes.CARD_RESTAURANT_DETAIL_INFORMATION}/${ImageTypes.CARD_RESTAURANT_DETAIL_INFORMATION_FACADE_IMAGE}`, dto.facadeImage);
      let menuImagesPromise = this.storageService.uploadMultiFiles(`${ImageTypes.CARD_RESTAURANT_DETAIL_INFORMATION}/${ImageTypes.CARD_RESTAURANT_DETAIL_INFORMATION_MENU_IMAGE}`, dto.menuImages);

      const [avatar, coverImage, facadeImage, menuImages] = await Promise.all([
        avatarPromise,
        coverImagePromise,
        facadeImagePromise,
        menuImagesPromise
      ]);
      const creating = this.detailInformationRepository.create({
        ...dto,
        avatar,
        coverImage,
        facadeImage,
        menuImages,
        restaurant
      });
      return await this.detailInformationRepository.save(creating);
    } catch (error) {
      throw new BadRequestException({
        message: error.message
      })
    }
  }

  findAll() {
    return `This action returns all detailInformation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detailInformation`;
  }

  update(id: number, updateDetailInformationDto: UpdateDetailInformationDto) {
    return `This action updates a #${id} detailInformation`;
  }

  remove(id: number) {
    return `This action removes a #${id} detailInformation`;
  }

}
