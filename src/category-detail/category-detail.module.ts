import { Module } from '@nestjs/common';
import { CategoryDetailService } from './category-detail.service';
import { CategoryDetailController } from './category-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryDetail } from './entities/category-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryDetail])],
  controllers: [CategoryDetailController],
  providers: [CategoryDetailService],
  exports: [CategoryDetailService]
})
export class CategoryDetailModule { }
