import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RepresentativeInformationService } from 'src/representative-information/representative-information.service';
import { BusinessModelService } from 'src/business-model/business-model.service';
import { UsersService } from 'src/users/users.service';

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

  async findAll() {
    return `This action returns all restaurant`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} restaurant`;
  }

  async update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    return `This action updates a #${id} restaurant`;
  }

  async remove(id: number) {
    return `This action removes a #${id} restaurant`;
  }
}
