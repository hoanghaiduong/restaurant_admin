import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './common/config/validation.config';
import { FirebaseModule } from './firebase/firebase.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { ProductModule } from './product/product.module';
import { ReviewsModule } from './reviews/reviews.module';
import { MenusModule } from './menus/menus.module';
import { ContractModule } from './contract/contract.module';
import { OrdersModule } from './orders/orders.module';
import { LobbyModule } from './lobby/lobby.module';
import { StorageModule } from './storage/storage.module';
import { BusinessModelModule } from './business-model/business-model.module';
import { ProvinceModule } from './province/province.module';
import { DistrictModule } from './district/district.module';
import { WardModule } from './ward/ward.module';
import { AdministrativeUnitModule } from './administrative-unit/administrative-unit.module';
import { AdministrativeRegionModule } from './administrative-region/administrative-region.module';
import { RepresentativeInformationModule } from './representative-information/representative-information.module';
import { DetailInformationModule } from './detail-information/detail-information.module';
import { TypeOfServiceModule } from './type-of-service/type-of-service.module';
import { CategoriesModule } from './categories/categories.module';
import { CategoryDetailModule } from './category-detail/category-detail.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
      envFilePath: [`.env`, `.env.${process.env.NODE_ENV}`], // load env
    }),
    DatabaseModule,
    FirebaseModule,
    AuthModule,
    UsersModule,
    RolesModule,
    RestaurantModule,
    ProductModule,
    ReviewsModule,
    MenusModule,
    ContractModule,
    OrdersModule,
    LobbyModule,
    StorageModule,
    BusinessModelModule,
    ProvinceModule,
    DistrictModule,
    WardModule,
    AdministrativeUnitModule,
    AdministrativeRegionModule,
    RepresentativeInformationModule,
    DetailInformationModule,
    TypeOfServiceModule,
    CategoriesModule,
    CategoryDetailModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
