import { PartialType } from '@nestjs/swagger';
import { CreateTypeOfServiceDto } from './create-type-of-service.dto';

export class UpdateTypeOfServiceDto extends PartialType(CreateTypeOfServiceDto) {}
