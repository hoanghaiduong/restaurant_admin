import { Module } from '@nestjs/common';
import { CategoryDetailsService } from './category-details.service';
import { CategoryDetailsController } from './category-details.controller';

@Module({
  controllers: [CategoryDetailsController],
  providers: [CategoryDetailsService]
})
export class CategoryDetailsModule {}
