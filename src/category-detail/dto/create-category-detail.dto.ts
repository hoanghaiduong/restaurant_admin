import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDetailDto {

    @ApiProperty()
    name: string;

    @ApiProperty({ nullable: true })
    description: string;

    @ApiProperty({nullable:false})
    categoryId: string;
}
