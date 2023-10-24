import { Module } from '@nestjs/common';
import { WardService } from './ward.service';
import { WardController } from './ward.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ward } from './entities/ward.entity';
import { District } from 'src/district/entities/district.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ward])],
  controllers: [WardController],
  providers: [WardService]
})
export class WardModule { }
