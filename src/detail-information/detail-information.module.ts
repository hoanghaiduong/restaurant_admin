import { Module } from '@nestjs/common';
import { DetailInformationService } from './detail-information.service';
import { DetailInformationController } from './detail-information.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailInformation } from './entities/detail-information.entity';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { StorageService } from 'src/storage/storage.service';
import { BusinessModelService } from 'src/business-model/business-model.service';
import { BusinessModel } from 'src/business-model/entities/business-model.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Role } from 'src/roles/entities/role.entity';
import { RolesService } from 'src/roles/roles.service';
import { TypeOfServiceService } from 'src/type-of-service/type-of-service.service';
import { TypeOfService } from 'src/type-of-service/entities/type-of-service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DetailInformation, Restaurant, BusinessModel, User, Role,TypeOfService])],
  controllers: [DetailInformationController],
  providers: [DetailInformationService, RestaurantService, StorageService, BusinessModelService, UsersService, RolesService,TypeOfServiceService],
  exports: [DetailInformationService]
})
export class DetailInformationModule { }
