import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryDetailsService } from './category-details.service';
import { CreateCategoryDetailDto } from './dto/create-category-detail.dto';
import { UpdateCategoryDetailDto } from './dto/update-category-detail.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags("Api Category Details")
@Controller('category-details')
export class CategoryDetailsController {
  constructor(private readonly categoryDetailsService: CategoryDetailsService) { }

  @Post()
  create(@Body() createCategoryDetailDto: CreateCategoryDetailDto) {
    return this.categoryDetailsService.create(createCategoryDetailDto);
  }

  @Get()
  findAll() {
    return this.categoryDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryDetailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDetailDto: UpdateCategoryDetailDto) {
    return this.categoryDetailsService.update(+id, updateCategoryDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryDetailsService.remove(+id);
  }
}
