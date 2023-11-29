import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
import { PaginationModel } from 'src/common/pagination/pagination.model';
import { Pagination } from 'src/common/pagination/pagination.dto';
import { Meta } from 'src/common/pagination/meta.dto';

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

  async findAll(pagination: Pagination): Promise<PaginationModel<DetailInformation>> {
    const [entities, itemCount] = await this.detailInformationRepository.findAndCount({
      take: pagination.take,
      skip: pagination.skip,
    })
    const meta = new Meta({ itemCount, pagination });
    return new PaginationModel<DetailInformation>(entities, meta);
  }

  async findOne(id: string): Promise<DetailInformation> {
    const detailInformation = await this.detailInformationRepository.findOne({
      where: { id }
    })
    if (!detailInformation) throw new NotFoundException('Detail information not found')
    return detailInformation;
  }

  async update(id: string, dto: UpdateDetailInformationDto) {
    try {
      const entity = await this.findOne(id);
      const merged = this.detailInformationRepository.merge(entity, dto);
      return await this.detailInformationRepository.save(merged);
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async remove(id: string): Promise<object> {
    try {
      const entity = await this.findOne(id);
      await this.detailInformationRepository.remove(entity);
      return {
        message: 'Delete Detail Information with id ' + id + ' successfully'
      }

    } catch (error) {
      throw new BadRequestException(error);
    }
  }

}
