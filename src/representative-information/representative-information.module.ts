import { Module } from '@nestjs/common';
import { RepresentativeInformationService } from './representative-information.service';
import { RepresentativeInformationController } from './representative-information.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepresentativeInformation } from './entities/representative-information.entity';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { StorageService } from 'src/storage/storage.service';
import { BusinessModel } from 'src/business-model/entities/business-model.entity';
import { BusinessModelService } from 'src/business-model/business-model.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Role } from 'src/roles/entities/role.entity';
import { RolesService } from 'src/roles/roles.service';

@Module({
  imports: [TypeOrmModule.forFeature([RepresentativeInformation,Restaurant,BusinessModel,User,Role])],
  controllers: [RepresentativeInformationController],
  providers: [RepresentativeInformationService,RestaurantService,StorageService,BusinessModelService,UsersService,RolesService],
  exports: [RepresentativeInformationService]
})
export class RepresentativeInformationModule { }
