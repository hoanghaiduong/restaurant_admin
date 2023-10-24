import { Injectable } from '@nestjs/common';
import { CreateCategoryDetailDto } from './dto/create-category-detail.dto';
import { UpdateCategoryDetailDto } from './dto/update-category-detail.dto';
import { BaseService } from 'src/base/base.service';
import { CategoryDetail } from './entities/category-detail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryDetailService extends BaseService<CategoryDetail>{
  constructor(@InjectRepository(CategoryDetail) private categoryDetailRepository: Repository<CategoryDetail>) {
    super(categoryDetailRepository);
  }
}
