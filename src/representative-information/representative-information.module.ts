import { Module } from '@nestjs/common';
import { RepresentativeInformationService } from './representative-information.service';
import { RepresentativeInformationController } from './representative-information.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepresentativeInformation } from './entities/representative-information.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RepresentativeInformation])],
  controllers: [RepresentativeInformationController],
  providers: [RepresentativeInformationService],
  exports: [RepresentativeInformationService]
})
export class RepresentativeInformationModule { }
