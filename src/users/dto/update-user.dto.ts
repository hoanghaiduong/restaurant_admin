import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { Location } from 'src/common/interface/locations';
import { Role } from 'src/roles/entities/role.entity';
import { LocationDto } from './location.dto';

export class UpdateUserDto {

    @ApiProperty({
        required: false
    })
    displayName?: string;

    @ApiProperty({
        required: false,
    })
    emailVerified?: boolean;
    firebase?: object;
    @ApiProperty({
        example: LocationDto,
        type: LocationDto,
        required: false,
    })
    location?: Location;
    @ApiProperty({
        type: "string",
        format: 'binary',
        required: false
    })
    photoURL?: Express.Multer.File;
    @ApiProperty({
        required: false
    })
    roleId?: string;
}