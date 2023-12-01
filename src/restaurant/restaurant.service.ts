import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { RepresentativeInformationService } from 'src/representative-information/representative-information.service';
import { BusinessModelService } from 'src/business-model/business-model.service';
import { UsersService } from 'src/users/users.service';
import { PaginationModel } from 'src/common/pagination/pagination.model';
import { Pagination } from 'src/common/pagination/pagination.dto';
import { Meta } from 'src/common/pagination/meta.dto';
import { Response, response } from 'express';

@Injectable()
export class RestaurantService {

  constructor(@InjectRepository(Restaurant) private restaurantRepository: Repository<Restaurant>,
    private businessModelService: BusinessModelService,
    private userService: UsersService,

  ) {

  }
  async create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    try {
      const businessModel = await this.businessModelService.findOne(createRestaurantDto.businessModelId);
      const user = await this.userService.findOne(createRestaurantDto.userUid);
      const create = this.restaurantRepository.create({
        ...createRestaurantDto,
        businessModel,
        user
      });
      return await this.restaurantRepository.save(create);
    } catch (error) {
      throw new BadRequestException({
        message: error.message,
      })
    }
  }
  async getListRestaurantByUser(uid: string, pagination: Pagination): Promise<PaginationModel<Restaurant> | any> {
    try {
      const queryBuilder = this.restaurantRepository.createQueryBuilder('restaurant')
        .leftJoinAndSelect('restaurant.user', 'user')
        .leftJoinAndSelect('restaurant.detailInformation', 'detailInformation')
        .leftJoinAndSelect('restaurant.representativeInformation', 'representativeInformation')
        .leftJoinAndSelect('restaurant.businessModel', 'businessModel')
        .leftJoinAndSelect('restaurant.products', 'products')
        .leftJoinAndSelect('restaurant.lobbies', 'lobbies')
        .skip(pagination.skip)
        .take(pagination.take)
        .orderBy('restaurant.name', pagination.order)
        .where('user.uid = :uid', { uid });
      if (pagination.search) {
        queryBuilder.andWhere('restaurant.name ILIKE :search', { search: `%${pagination.search}%` });
      }

      const [entities, itemCount] = await queryBuilder.getManyAndCount();
      const meta = new Meta({ itemCount, pagination });

      return new PaginationModel<Restaurant>(entities, meta);
    } catch (error) {
      throw new BadRequestException({
        message: error.message
      });
    }
  }
  async findAllProduct(id: string): Promise<Restaurant> {
    try {
      const restaurant = await this.restaurantRepository.findOne({
        where: { id },
        relations: ['user', 'detailInformation', 'representativeInformation', 'businessModel', 'products', 'lobbies']
      })
      if (!restaurant) throw new NotFoundException({
        message: 'No restaurant found'
      })
      return restaurant;

    } catch (error) {
      throw new BadRequestException({
        message: error.message
      })
    }
  }
  async findAll(pagination: Pagination): Promise<PaginationModel<Restaurant>> {
    try {
      const [entities, itemCount] = await this.restaurantRepository.findAndCount({
        take: pagination.take,
        skip: pagination.skip,
        where: {
          name: pagination.search ? ILike(`%${pagination.search}%`) : null
        },
        order: {
          name: pagination.order
        },
        relations: ['user', 'detailInformation', 'representativeInformation', 'businessModel', 'products', 'lobbies']
      });
      const meta = new Meta({ pagination, itemCount });
      return new PaginationModel<Restaurant>(entities, meta);
    } catch (error) {
      throw new BadRequestException({
        message: error.message
      })
    }
  }

  async findOne(id: string): Promise<Restaurant> {
    const restaurant = await this.restaurantRepository.findOne({
      where: { id }
    })
    if (!restaurant) throw new NotFoundException({
      message: 'No restaurant found'
    })
    return restaurant;
  }

  async update(id: string, updateRestaurantDto: UpdateRestaurantDto): Promise<Restaurant> {
    const restaurant = await this.findOne(id);
    return await this.restaurantRepository.save({
      ...restaurant,
      ...updateRestaurantDto
    })
  }

  async remove(id: string): Promise<object> {
    try {
      const restaurant = await this.findOne(id);
      await this.restaurantRepository.remove(restaurant);
      return {
        message: 'Restaurant deleted successfully'
      }
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
}
