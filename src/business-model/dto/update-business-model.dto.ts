import { PartialType } from '@nestjs/swagger';
import { CreateBusinessModelDto } from './create-business-model.dto';

export class UpdateBusinessModelDto extends PartialType(CreateBusinessModelDto) {}
