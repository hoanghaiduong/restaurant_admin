import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ILike, Repository } from 'typeorm';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { CategoriesService } from 'src/categories/categories.service';
import { StorageService } from 'src/storage/storage.service';
import { ImageTypes } from 'src/common/enum/file';
import { Pagination } from 'src/common/pagination/pagination.dto';
import { PaginationModel } from 'src/common/pagination/pagination.model';
import { Meta } from 'src/common/pagination/meta.dto';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private productRepository: Repository<Product>,
    private restaurantService: RestaurantService,
    private categoryService: CategoriesService,
    private storageService: StorageService
  ) {

  }
  async findAll(pagination: Pagination): Promise<PaginationModel<Product>> {
    const [entities, itemCount] = await this.productRepository.findAndCount({
      take: pagination.take,
      skip: pagination.skip,
      order: {
        createdAt: pagination.order
      },
      where: {
        name: pagination.search ? ILike(`%${pagination.search}%`) : null
      }
    })
    const meta = new Meta({ pagination, itemCount });
    return new PaginationModel<Product>(entities, meta);
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id }
    })
    if (!product) {
      throw new NotFoundException('Product not found ' + id);
    }
    return product
  }

  async create(dto: CreateProductDto): Promise<Product> {
    const imageToDelete: string[] = [];
    try {

      const restaurant = await this.restaurantService.findOne(dto.restaurantId);
      const category = await this.categoryService.findOne(dto.categoryId);
      const photo = await this.storageService.uploadFile(`${restaurant.name}/${ImageTypes.CARD_PRODUCT}`, dto.photo);
      const images = await this.storageService.uploadMultiFiles(`${restaurant.name}/${ImageTypes.CARD_PRODUCT}/${ImageTypes.CARD_PRODUCT_DETAILS}`, dto.images);
      imageToDelete.push(photo, ...images);
      const creating = this.productRepository.create({
        ...dto,
        restaurant,
        category,
        photo,
        images: images ?? null,
      });
      return await this.productRepository.save(creating);

    } catch (error) {
      await this.storageService.deleteMultiFiles(imageToDelete);
      throw new BadRequestException(error.message)
    }
  }

  async update(id: string, dto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    const merged = this.productRepository.merge(product, dto);
    return await this.productRepository.save(merged);
  }

  async remove(id: string): Promise<object> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
    return await new Promise<object>((resolve, reject) => {
      resolve({
        message: 'Removed product successfully'
      })
    })
  }
}
