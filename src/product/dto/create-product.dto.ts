import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from "class-validator";

export class CreateProductDto {


    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ required: false })
    @IsOptional()
    description?: string;

    @ApiProperty()
    @IsNotEmpty()

    price: number;

    @ApiProperty({
        type: 'string', format: 'binary'
    })
   // @IsNotEmpty()
    photo: Express.Multer.File;

    @ApiProperty({ required: false, type: 'string', format: 'binary', isArray: true })
    @IsOptional()
    images?: Express.Multer.File[];

    @ApiProperty()
    @IsUUID()
    categoryId: string;

    @ApiProperty()
    @IsNotEmpty()
    restaurantId: string;
}
