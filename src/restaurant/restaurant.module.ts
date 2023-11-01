import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { RepresentativeInformation } from 'src/representative-information/entities/representative-information.entity';
import { RepresentativeInformationService } from 'src/representative-information/representative-information.service';
import { BusinessModel } from 'src/business-model/entities/business-model.entity';
import { BusinessModelService } from 'src/business-model/business-model.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Role } from 'src/roles/entities/role.entity';
import { RolesService } from 'src/roles/roles.service';
import { StorageService } from 'src/storage/storage.service';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant,RepresentativeInformation,BusinessModel,User,Role])],
  controllers: [RestaurantController],
  providers: [RestaurantService,RepresentativeInformationService,BusinessModelService,UsersService,RolesService,StorageService],
  exports: [RestaurantService]
})
export class RestaurantModule { }
