import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { BaseService } from 'src/base/base.service';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService extends BaseService<Category> implements OnModuleInit {
  constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) {
    super(categoryRepository);
  }
  async onModuleInit(): Promise<void> {
    //
  }
}
