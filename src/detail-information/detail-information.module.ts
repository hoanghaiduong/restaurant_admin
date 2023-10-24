import { Module } from '@nestjs/common';
import { DetailInformationService } from './detail-information.service';
import { DetailInformationController } from './detail-information.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailInformation } from './entities/detail-information.entity';

@Module({
  imports:[TypeOrmModule.forFeature([DetailInformation])],
  controllers: [DetailInformationController],
  providers: [DetailInformationService]
})
export class DetailInformationModule {}
