import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, UploadedFiles } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { Product } from './entities/product.entity';
import { ApiFileFields } from 'src/common/decorators/file.decorator';
import { PaginationModel } from 'src/common/pagination/pagination.model';
import { Pagination } from 'src/common/pagination/pagination.dto';

@Controller('product')
@ApiTags("API Sản Phẩm")
export class ProductController {
  constructor(private readonly productService: ProductService) { }


  @Get()
  async findAll(@Query() pagination: Pagination): Promise<PaginationModel<Product>> {
    return await this.productService.findAll(pagination);
  }

  @Get('get')
  findOne(@Query('id') id: string): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Post('create')
  @ApiFileFields([
    { name: 'photo', maxCount: 1 },
    { name: 'images', maxCount: 5 }
  ])
  async create(@Body() dto: CreateProductDto, @UploadedFiles() files?: {
    photo: Express.Multer.File,
    images?: Express.Multer.File[]
  }): Promise<Product> {
    return await this.productService.create({
      ...dto,
      photo: files?.photo[0],
      images: files?.images
    });
  }

  @Put('update')
  async update(@Query('id') id: string, @Body() product: UpdateProductDto): Promise<Product> {
    return await this.productService.update(id, product);
  }

  @Delete('delete')
  async remove(@Query('id') id: string): Promise<object> {
    return await this.productService.remove(id);
  }
}
