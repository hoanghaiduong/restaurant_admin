import { PartialType } from '@nestjs/swagger';
import { CreateRepresentativeInformationDto } from './create-representative-information.dto';

export class UpdateRepresentativeInformationDto extends PartialType(CreateRepresentativeInformationDto) {}
