import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDetailInformationDto } from './dto/create-detail-information.dto';
import { UpdateDetailInformationDto } from './dto/update-detail-information.dto';
import { DetailInformation } from './entities/detail-information.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository, Transaction, getRepository } from 'typeorm';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { StorageService } from 'src/storage/storage.service';
import { ImageTypes } from 'src/common/enum/file';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import *  as fs from 'fs'

import { TypeOfServiceService } from 'src/type-of-service/type-of-service.service';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class DetailInformationService {
  constructor(@InjectRepository(DetailInformation) private detailInformationRepository: Repository<DetailInformation>, private restaurantService: RestaurantService, private storageService: StorageService, private configService: ConfigService,
    private typeOfService: TypeOfServiceService) {

  }

  async create(dto: CreateDetailInformationDto): Promise<DetailInformation> {
    const imagesToDelete: string[] = [];
    try {


      // Tìm nhà hàng
      const restaurant = await this.restaurantService.findOne(dto.restaurantId);


      // Tạo các hứa
      const avatarPromise = this.storageService.uploadFile(`${restaurant.name}/${ImageTypes.CARD_RESTAURANT_DETAIL_INFORMATION}/${ImageTypes.CARD_RESTAURANT_DETAIL_INFORMATION_AVATAR}`, dto.avatar);
      const coverImagePromise = this.storageService.uploadFile(`${restaurant.name}/${ImageTypes.CARD_RESTAURANT_DETAIL_INFORMATION}/${ImageTypes.CARD_RESTAURANT_DETAIL_INFORMATION_COVER_IMAGE}`, dto.coverImage);
      const facadeImagePromise = this.storageService.uploadFile(`${restaurant.name}/${ImageTypes.CARD_RESTAURANT_DETAIL_INFORMATION}/${ImageTypes.CARD_RESTAURANT_DETAIL_INFORMATION_FACADE_IMAGE}`, dto.facadeImage);
      const menuImagesPromise = this.storageService.uploadMultiFiles(`${restaurant.name}/${ImageTypes.CARD_RESTAURANT_DETAIL_INFORMATION}/${ImageTypes.CARD_RESTAURANT_DETAIL_INFORMATION_MENU_IMAGE}`, dto.menuImages);

      // Đợi cho tất cả các hứa hoàn thành
      const [avatar, coverImage, facadeImage, menuImages] = await Promise.all([
        avatarPromise,
        coverImagePromise,
        facadeImagePromise,
        menuImagesPromise
      ]);
      imagesToDelete.push(avatar, coverImage, facadeImage, ...menuImages);

      // Tạo và lưu DetailInformation
      const typeOfServiceIds = dto.typeOfServiceIds;
      const typeOfServices = await this.typeOfService.findByIds(typeOfServiceIds);

      const creating = this.detailInformationRepository.create({
        ...dto,
        avatar,
        coverImage,
        facadeImage,
        menuImages,
        restaurant,
        typeOfServices,
      });

      const saved = await this.detailInformationRepository.save(creating);

      return saved;
    } catch (error) {
      console.error(error);
      await this.storageService.deleteMultiFiles(imagesToDelete);

      throw new BadRequestException({
        message: error.message
      });

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
