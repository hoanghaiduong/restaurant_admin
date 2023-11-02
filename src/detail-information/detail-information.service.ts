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

import { TypeOfServiceService } from 'src/type-of-service/type-of-service.service';

@Injectable()
export class DetailInformationService {
  constructor(@InjectRepository(DetailInformation) private detailInformationRepository: Repository<DetailInformation>, private restaurantService: RestaurantService, private storageService: StorageService, private configService: ConfigService,
    private typeOfService: TypeOfServiceService) {

  }
  async transformAndParseArray(array: any[], stringifyAndParse: boolean): Promise<any[]> {
    if (stringifyAndParse) {
      return array.map((item) => {
        const stringifiedItem = JSON.stringify(item);
        try {
          return JSON.parse(stringifiedItem);
        } catch (error) {
          // Bỏ qua nếu không thể parse
          return stringifiedItem;
        }
      });
    }
    return array;
  }
  // async create(dto: CreateDetailInformationDto): Promise<DetailInformation | any> {
  //   try {
  //     const sunday = JSON.parse(JSON.parse(JSON.stringify(dto.sunday)));
  //     const monday = JSON.parse(JSON.parse(JSON.stringify(dto.monday)));
  //     const tuesday = JSON.parse(JSON.parse(JSON.stringify(dto.tuesday)));
  //     const wednesday = JSON.parse(JSON.parse(JSON.stringify(dto.wednesday)));
  //     const thursday = JSON.parse(JSON.parse(JSON.stringify(dto.thursday)));
  //     const friday = JSON.parse(JSON.parse(JSON.stringify(dto.friday)));
  //     const saturday = JSON.parse(JSON.parse(JSON.stringify(dto.saturday)));

    
  //     const restaurant = await this.restaurantService.findOne(dto.restaurantId);

  //     const regex = /\[|\]/;
  //     let typeOfService = null;
  //     if (regex.test(dto.typeOfServiceIds.toString())) {
  //       typeOfService = JSON.parse(dto.typeOfServiceIds.toString());
  //     }
  //     else {
  //       typeOfService = dto.typeOfServiceIds.toString().split(",");

  //     }
  //     const typeOfServices = await this.typeOfService.findByIds(typeOfService);



  //     const basePath = join('.', this.configService.get<string>('FOLDER_UPLOAD'));
  //     const restaurantUploadPath = join(basePath, ImageTypes.CARD_RESTAURANT_DETAIL_INFORMATION);
  //     if (!fs.existsSync(basePath)) {
  //       fs.mkdirSync(basePath);
  //     }

  //     if (!fs.existsSync(restaurantUploadPath)) {
  //       fs.mkdirSync(restaurantUploadPath);
  //     }

  //     let avatarPromise = this.storageService.uploadFile(`${ImageTypes.CARD_RESTAURANT_DETAIL_INFORMATION}/${ImageTypes.CARD_RESTAURANT_DETAIL_INFORMATION_AVATAR}`, dto.avatar);

  //     let coverImagePromise = this.storageService.uploadFile(`${ImageTypes.CARD_RESTAURANT_DETAIL_INFORMATION}/${ImageTypes.CARD_RESTAURANT_DETAIL_INFORMATION_COVER_IMAGE}`, dto.coverImage);

  //     let facadeImagePromise = this.storageService.uploadFile(`${ImageTypes.CARD_RESTAURANT_DETAIL_INFORMATION}/${ImageTypes.CARD_RESTAURANT_DETAIL_INFORMATION_FACADE_IMAGE}`, dto.facadeImage);
  //     let menuImagesPromise = this.storageService.uploadMultiFiles(`${ImageTypes.CARD_RESTAURANT_DETAIL_INFORMATION}/${ImageTypes.CARD_RESTAURANT_DETAIL_INFORMATION_MENU_IMAGE}`, dto.menuImages);


  //     const [avatar, coverImage, facadeImage, menuImages] = await Promise.all([
  //       avatarPromise,
  //       coverImagePromise,
  //       facadeImagePromise,
  //       menuImagesPromise
  //     ]);
  //     const creating = this.detailInformationRepository.create({
  //       ...dto,
  //       avatar,
  //       coverImage,
  //       facadeImage,
  //       menuImages,
  //       restaurant,
  //       typeOfServices,
  //       sunday,
  //       monday,
  //       tuesday,
  //       wednesday,
  //       thursday,
  //       friday,
  //       saturday,


  //     });
  //     return await this.detailInformationRepository.save(creating);
  //   } catch (error) {
  //     console.error(error);
  //     throw new BadRequestException({
  //       message: error.message
  //     })
  //   }

  // }
  async create(dto: CreateDetailInformationDto): Promise<DetailInformation | any> {
    try {
      // Hàm để stringify và parse một biến
      const stringifyAndParse = (value: any) => {
        if (typeof value === 'string') {
          if (/\[|\]/.test(value)) {
            return JSON.parse(value);
          }
          return value.split(",");
        }
        return value;
      };
      
      // Parse các trường ngày
      const sunday = stringifyAndParse(dto.sunday);
      const monday = stringifyAndParse(dto.monday);
      const tuesday = stringifyAndParse(dto.tuesday);
      const wednesday = stringifyAndParse(dto.wednesday);
      const thursday = stringifyAndParse(dto.thursday);
      const friday = stringifyAndParse(dto.friday);
      const saturday = stringifyAndParse(dto.saturday);
  
      // Tìm nhà hàng
      const restaurant = await this.restaurantService.findOne(dto.restaurantId);
  
      // Tạo đường dẫn lưu trữ
      const basePath = join('.', this.configService.get<string>('FOLDER_UPLOAD'));
      const restaurantUploadPath = join(basePath, ImageTypes.CARD_RESTAURANT_DETAIL_INFORMATION);
      if (!fs.existsSync(basePath)) {
        fs.mkdirSync(basePath);
      }
  
      if (!fs.existsSync(restaurantUploadPath)) {
        fs.mkdirSync(restaurantUploadPath);
      }
  
      // Tạo các hứa
      const avatarPromise = this.storageService.uploadFile(`${ImageTypes.CARD_RESTAURANT_DETAIL_INFORMATION}/${ImageTypes.CARD_RESTAURANT_DETAIL_INFORMATION_AVATAR}`, dto.avatar);
      const coverImagePromise = this.storageService.uploadFile(`${ImageTypes.CARD_RESTAURANT_DETAIL_INFORMATION}/${ImageTypes.CARD_RESTAURANT_DETAIL_INFORMATION_COVER_IMAGE}`, dto.coverImage);
      const facadeImagePromise = this.storageService.uploadFile(`${ImageTypes.CARD_RESTAURANT_DETAIL_INFORMATION}/${ImageTypes.CARD_RESTAURANT_DETAIL_INFORMATION_FACADE_IMAGE}`, dto.facadeImage);
      const menuImagesPromise = this.storageService.uploadMultiFiles(`${ImageTypes.CARD_RESTAURANT_DETAIL_INFORMATION}/${ImageTypes.CARD_RESTAURANT_DETAIL_INFORMATION_MENU_IMAGE}`, dto.menuImages);
  
      // Đợi cho tất cả các hứa hoàn thành
      const [avatar, coverImage, facadeImage, menuImages] = await Promise.all([
        avatarPromise,
        coverImagePromise,
        facadeImagePromise,
        menuImagesPromise
      ]);
  
      // Tạo và lưu DetailInformation
      const typeOfServiceIds = stringifyAndParse(dto.typeOfServiceIds);
      const typeOfServices = await this.typeOfService.findByIds(typeOfServiceIds);
  
      const creating = this.detailInformationRepository.create({
        ...dto,
        avatar,
        coverImage,
        facadeImage,
        menuImages,
        restaurant,
        typeOfServices,
        sunday,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
      });
  
      return await this.detailInformationRepository.save(creating);
    } catch (error) {
      console.error(error);
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
