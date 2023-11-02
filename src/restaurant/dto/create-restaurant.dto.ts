import { IsString, IsNotEmpty, IsUUID, IsPhoneNumber, IsObject, IsNumber, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Location } from 'src/common/interface/locations';

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
    @IsObject()
    location: Location;

    @ApiProperty({
        nullable:false
    })
    verified: boolean;
    @ApiProperty({
        nullable:false
    })
    disabled: boolean;
    @ApiProperty()
    @IsUUID()
    businessModelId: string;

    userUid:string;
}
