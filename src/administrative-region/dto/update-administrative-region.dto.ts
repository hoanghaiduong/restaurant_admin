import { PartialType } from '@nestjs/swagger';
import { CreateAdministrativeRegionDto } from './create-administrative-region.dto';

export class UpdateAdministrativeRegionDto extends PartialType(CreateAdministrativeRegionDto) {}
