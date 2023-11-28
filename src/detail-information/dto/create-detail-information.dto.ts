import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsArray, IsString, IsUUID, ValidateNested } from "class-validator";
import { DaySchedule } from "src/common/interface/Open-closeTime";

export class CreateDetailInformationDto {


    @ApiProperty({ nullable: false }) // Một ví dụ cho mối quan hệ một-đến-một
    restaurantId: string;

    @ApiProperty() // Một ví dụ cho mối quan hệ một-đến-một
    @ValidateNested()
    @Transform(({ value }) => typeof value === "string" ? JSON.parse(value) : value)
    @Transform(({ value }) => typeof value === 'object' ? value : JSON.parse(value))

    sunday: DaySchedule;

    @ApiProperty()
    @ValidateNested()
    @Transform(({ value }) => typeof value === "string" ? JSON.parse(value) : value)
    @Transform(({ value }) => typeof value === 'object' ? value : JSON.parse(value))

    monday: DaySchedule;

    @ApiProperty()
    @ValidateNested()
    @Transform(({ value }) => typeof value === "string" ? JSON.parse(value) : value)
    @Transform(({ value }) => typeof value === 'object' ? value : JSON.parse(value))
    tuesday: DaySchedule;

    @ApiProperty()
    @ValidateNested()
    @Transform(({ value }) => typeof value === "string" ? JSON.parse(value) : value)
    @Transform(({ value }) => typeof value === 'object' ? value : JSON.parse(value))
    wednesday: DaySchedule;

    @ApiProperty()
    @ValidateNested()
    @Transform(({ value }) => typeof value === "string" ? JSON.parse(value) : value)
    @Transform(({ value }) => typeof value === 'object' ? value : JSON.parse(value))
    thursday: DaySchedule;
    @ApiProperty()
    @ValidateNested()
    @Transform(({ value }) => typeof value === "string" ? JSON.parse(value) : value)
    @Transform(({ value }) => typeof value === 'object' ? value : JSON.parse(value))
    friday: DaySchedule;

    @ApiProperty()
    @ValidateNested()
    @Transform(({ value }) => typeof value === "string" ? JSON.parse(value) : value)
    @Transform(({ value }) => typeof value === 'object' ? value : JSON.parse(value))
    saturday: DaySchedule;

    @ApiProperty({ example: 'Sample Keyword' })
    keyword_search: string;

    @ApiProperty({ example: 'Sample Description' })
    descriptions: string;

    @ApiProperty({
        type: 'string',
        format: 'binary'
    })
    avatar: Express.Multer.File;

    @ApiProperty({
        type: 'string',
        format: 'binary'
    })
    coverImage: Express.Multer.File;

    @ApiProperty({
        type: 'string',
        format: 'binary'
    })
    facadeImage: Express.Multer.File;

    @ApiProperty({
        isArray: true,
        type: 'string',
        format: 'binary'
    })
    menuImages: Express.Multer.File[];

    @ApiProperty({
        nullable: false,
    })
    // @Transform(({ value }) => typeof value === 'string' ? [value] : value)
    @Transform(({ value }) => {
        if (typeof value === 'string') {
            // Split the string based on the comma (',') delimiter
            return value.split(',');
        }
        return value;
    })
    @IsArray()
    @IsString({ each: true }) // Validate each element of the array to be a string
    @IsUUID("all", { each: true })
    typeOfServiceIds: string[];
}
