import { PartialType } from '@nestjs/swagger';
import { CreateAdministrativeUnitDto } from './create-administrative-unit.dto';

export class UpdateAdministrativeUnitDto extends PartialType(CreateAdministrativeUnitDto) {}
