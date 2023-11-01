import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { ApiTags } from '@nestjs/swagger';
import { Restaurant } from './entities/restaurant.entity';
import { RoleGuard } from 'src/auth/guard/Role.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('restaurant')
@ApiTags("API Nhà hàng")
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

  @Get()
  findAll() {
    return this.restaurantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restaurantService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRestaurantDto: UpdateRestaurantDto) {
    return this.restaurantService.update(+id, updateRestaurantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restaurantService.remove(+id);
  }
}
