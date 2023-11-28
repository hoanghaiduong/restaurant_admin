import { IsString, IsNotEmpty, IsUUID, IsPhoneNumber, IsObject, IsNumber, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Location } from 'src/common/interface/locations';
import { Transform } from 'class-transformer';

export class CreateRestaurantDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    type: string;

    @ApiProperty()
    @IsString()
    street: string;

    @ApiProperty()
    @IsPhoneNumber('VN')
    phone: string;

    @ApiProperty()
    @IsString()
    province: string;

    @ApiProperty()
    @IsString()
    district: string;

    @ApiProperty()
    @IsString()
    ward: string;

    @ApiProperty()
    @IsString()
    houseNumber: string;

    @ApiProperty()
    @Transform(({ value }) => typeof value === 'string' ? JSON.parse(value) : value)
    @Transform(({ value }) => typeof value === 'object' ? value : JSON.parse(value))
    location: Location;

    @ApiProperty({
        nullable: false,
        type: 'integer',
        default: 0
    })
    statusGranted: number;

    @ApiProperty({
        nullable: false
    })
    disabled: boolean;
    @ApiProperty()
    @IsUUID()
    businessModelId: string;

    userUid: string;
}
