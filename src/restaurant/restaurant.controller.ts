import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { ApiTags } from '@nestjs/swagger';
import { Restaurant } from './entities/restaurant.entity';
import { RoleGuard } from 'src/auth/guard/Role.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Pagination } from 'src/common/pagination/pagination.dto';
import { PaginationModel } from 'src/common/pagination/pagination.model';
import { Response } from 'express';

@Controller('restaurant')
@ApiTags("API Nhà hàng Bước 1")
@UseGuards(RoleGuard)
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) { }

  @Roles('restaurant')
  @Post('create')
  async create(@Req() req, @Body() createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    return await this.restaurantService.create({
      ...createRestaurantDto,
      userUid: req.uid
    });
  }

  @Get('gets')
  async findAll(@Query() pagination: Pagination): Promise<PaginationModel<Restaurant>> {
    return await this.restaurantService.findAll(pagination);
  }
  @Get('getProducts')
  async findAllProduct(@Query('restaurant_id') resId: string): Promise<Restaurant> {
    return await this.restaurantService.findAllProduct(resId);
  }
  @Get('get')
  async findOne(@Query('id') id: string): Promise<Restaurant> {
    return await this.restaurantService.findOne(id);
  }
  @Roles('restaurant', 'admin')
  @Get('getRestaurantsByUser')
  async findRestaurantsByUser(@Req() req, @Query() pagination: Pagination): Promise<PaginationModel<Restaurant>> {
    return await this.restaurantService.getListRestaurantByUser(req.uid, pagination);
  }
  @Patch('update')
  async update(@Query('id') id: string, @Body() updateRestaurantDto: UpdateRestaurantDto): Promise<Restaurant> {
    return await this.restaurantService.update(id, updateRestaurantDto);
  }

  @Delete('delete')
  async remove(@Query('id') id: string): Promise<Response> {
    return await this.restaurantService.remove(id);
  }
}
