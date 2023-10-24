import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { BaseController } from 'src/base/base.controller';
import { Category } from './entities/category.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('categories')
@ApiTags("API Danh mục")
export class CategoriesController extends BaseController<Category>{
  constructor(private readonly categoriesService: CategoriesService) {
    super(categoriesService);
  }
}
