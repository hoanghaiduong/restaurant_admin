import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryDetailService } from './category-detail.service';
import { CreateCategoryDetailDto } from './dto/create-category-detail.dto';
import { UpdateCategoryDetailDto } from './dto/update-category-detail.dto';
import { BaseController } from 'src/base/base.controller';
import { CategoryDetail } from './entities/category-detail.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('category-detail')
@ApiTags("API Danh mục")
export class CategoryDetailController extends BaseController<CategoryDetail>{
  constructor(private readonly categoryDetailService: CategoryDetailService) {
    super(categoryDetailService)
  }
}
