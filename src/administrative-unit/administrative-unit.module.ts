import { Module } from '@nestjs/common';
import { AdministrativeUnitService } from './administrative-unit.service';
import { AdministrativeUnitController } from './administrative-unit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdministrativeUnit } from './entities/administrative-unit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdministrativeUnit])],
  controllers: [AdministrativeUnitController],
  providers: [AdministrativeUnitService]
})
export class AdministrativeUnitModule { }
