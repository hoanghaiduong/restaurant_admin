import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRepresentativeInformationDto } from './dto/create-representative-information.dto';
import { UpdateRepresentativeInformationDto } from './dto/update-representative-information.dto';
import { RepresentativeInformation } from './entities/representative-information.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { StorageService } from 'src/storage/storage.service';
import { ImageTypes } from 'src/common/enum/file';
import { join } from 'path';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RepresentativeInformationService {
  constructor(@InjectRepository(RepresentativeInformation) private representativeRepository: Repository<RepresentativeInformation>,
    private restaurantService: RestaurantService,
    private storageService: StorageService,
    private readonly configService: ConfigService
  ) {

  }
  // async create(restaurantId: string, dto: CreateRepresentativeInformationDto): Promise<RepresentativeInformation | any> {
  //   try {
  //     const restaurant = await this.restaurantService.findOne(restaurantId);
  //     const basePath = join('.', this.configService.get<string>('FOLDER_UPLOAD'));
  //     const restaurantUploadPath = join(basePath, ImageTypes.CARD_RESTAURANT);
  //     if (!fs.existsSync(basePath)) {
  //       fs.mkdirSync(basePath);
  //     }
  //     else {
  //       if (!fs.existsSync(restaurantUploadPath)) {
  //         // Nếu chưa có, tạo thư mục 'public/uploads/restaurants'
  //         fs.mkdirSync(restaurantUploadPath);
  //       }

  //     }

  //     let [idCard, businessRegImages, taxCodeImages, relatedImages] = await Promise.all([
  //       this.storageService.uploadMultiFiles(`${ImageTypes.CARD_RESTAURANT}/${ImageTypes.CARD_RESTAURANT_ID_CARD}`, dto.idCard),
  //       dto.businessRegImages ? this.storageService.uploadMultiFiles(`${ImageTypes.CARD_RESTAURANT}/${ImageTypes.CARD_RESTAURANT_BUSINESS_REGISTER}`, dto.businessRegImages) : null,
  //       this.storageService.uploadMultiFiles(`${ImageTypes.CARD_RESTAURANT}/${ImageTypes.CARD_RESTAURANT_TAX_CODE}`, dto.taxCodeImages),
  //       dto.relatedImages ? this.storageService.uploadMultiFiles(`${ImageTypes.CARD_RESTAURANT}/${ImageTypes.CARD_RESTAURANT_RELATED}`, dto.relatedImages) : null,
  //     ]);
  //     const creating = this.representativeRepository.create({
  //       ...dto,
  //       idCard,
  //       businessRegImages,
  //       taxCodeImages,
  //       relatedImages,
  //       restaurant
  //     });
  //     return await this.representativeRepository.save(creating);
  //   } catch (error) {
  //     throw new BadRequestException({
  //       message: `Error while creating representation information for ${error.message}`,
  //       error: error.message
  //     })
  //   }
  // }
  async create(restaurantId: string, dto: CreateRepresentativeInformationDto): Promise<RepresentativeInformation> {
    const imagesToDelete: string[] = [];
    try {

      const restaurant = await this.restaurantService.findOne(restaurantId);

      const idCardPromise = this.storageService.uploadMultiFiles(`${restaurant.name}/${ImageTypes.CARD_RESTAURANT}/${ImageTypes.CARD_RESTAURANT_ID_CARD}`, dto.idCard);

      const businessRegImagesPromise = dto.businessRegImages
        ? this.storageService.uploadMultiFiles(`${restaurant.name}/${ImageTypes.CARD_RESTAURANT}/${ImageTypes.CARD_RESTAURANT_BUSINESS_REGISTER}`, dto.businessRegImages)
        : null;

      const taxCodeImagesPromise = this.storageService.uploadMultiFiles(`${restaurant.name}/${ImageTypes.CARD_RESTAURANT}/${ImageTypes.CARD_RESTAURANT_TAX_CODE}`, dto.taxCodeImages);

      const relatedImagesPromise = dto.relatedImages
        ? this.storageService.uploadMultiFiles(`${restaurant.name}/${ImageTypes.CARD_RESTAURANT}/${ImageTypes.CARD_RESTAURANT_RELATED}`, dto.relatedImages)
        : null;

      const [idCard, businessRegImages, taxCodeImages, relatedImages] = await Promise.all([
        idCardPromise,
        businessRegImagesPromise,
        taxCodeImagesPromise,
        relatedImagesPromise,
      ]);
      imagesToDelete.push(...idCard, ...businessRegImages, ...taxCodeImages, ...relatedImages);

      const creating = this.representativeRepository.create({
        ...dto,
        idCard,
        businessRegImages,
        taxCodeImages,
        relatedImages,
        restaurant,
      });

      return await this.representativeRepository.save(creating);
    } catch (error) {
      await this.storageService.deleteMultiFiles(imagesToDelete)
      throw new BadRequestException({
        message: `Error while creating representation information for ${error.message}`,
        error: error.message,
      });
    }
  }

  findAll() {
    return `This action returns all representativeInformation`;
  }

  async findOne(id: string): Promise<RepresentativeInformation> {
    return;
  }

  update(id: number, updateRepresentativeInformationDto: UpdateRepresentativeInformationDto) {
    return `This action updates a #${id} representativeInformation`;
  }

  remove(id: number) {
    return `This action removes a #${id} representativeInformation`;
  }
}
