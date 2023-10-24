import { Module } from '@nestjs/common';
import { BusinessModelService } from './business-model.service';
import { BusinessModelController } from './business-model.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessModel } from './entities/business-model.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessModel])],
  controllers: [BusinessModelController],
  providers: [BusinessModelService]
})
export class BusinessModelModule { }
