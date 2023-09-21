import { Module } from '@nestjs/common';
import { CategoryTypeService } from './category-type.service';
import { CategoryTypeController } from './category-type.controller';

@Module({
  controllers: [CategoryTypeController],
  providers: [CategoryTypeService]
})
export class CategoryTypeModule {}
