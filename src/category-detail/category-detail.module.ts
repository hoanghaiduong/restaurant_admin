import { Module } from '@nestjs/common';
import { CategoryDetailService } from './category-detail.service';
import { CategoryDetailController } from './category-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryDetail } from './entities/category-detail.entity';
import { Category } from 'src/categories/entities/category.entity';
import { CategoriesService } from 'src/categories/categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryDetail,Category])],
  controllers: [CategoryDetailController],
  providers: [CategoryDetailService,CategoriesService],
  exports: [CategoryDetailService]
})
export class CategoryDetailModule { }
