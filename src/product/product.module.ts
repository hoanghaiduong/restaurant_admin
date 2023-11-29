import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { RestaurantModule } from 'src/restaurant/restaurant.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { StorageService } from 'src/storage/storage.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), RestaurantModule, CategoriesModule],
  controllers: [ProductController],
  providers: [ProductService, StorageService],
  exports: [ProductService]
})
export class ProductModule { }
