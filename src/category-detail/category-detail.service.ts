import { Injectable } from '@nestjs/common';
import { CreateCategoryDetailDto } from './dto/create-category-detail.dto';
import { UpdateCategoryDetailDto } from './dto/update-category-detail.dto';
import { BaseService } from 'src/base/base.service';
import { CategoryDetail } from './entities/category-detail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBaseDto } from 'src/base/dto/create-base.dto';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class CategoryDetailService extends BaseService<CategoryDetail>{
  constructor(@InjectRepository(CategoryDetail) private categoryDetailRepository: Repository<CategoryDetail>,
    private categoryService: CategoriesService
  ) {
    super(categoryDetailRepository);
  }
  // async create(dto: CreateCategoryDetailDto): Promise<CategoryDetail> {
  //   const category = await this.categoryService.findOne(dto.categoryId);
  //   const creating = this.categoryDetailRepository.create({
  //     ...dto,
  //     category
  //   })
  //   return await this.categoryDetailRepository.save(creating);
  // }
}
