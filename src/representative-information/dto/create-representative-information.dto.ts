import { ApiProperty } from "@nestjs/swagger";

export class CreateRepresentativeInformationDto {
    @ApiProperty({ example: false })
    registerType: boolean;

    @ApiProperty({ example: 'John Doe' })
    name: string;

    @ApiProperty({ example: 'johndoe@example.com' })
    email: string;

    @ApiProperty({ example: '123-456-7890' })
    phoneNumber: string;

    @ApiProperty({ example: '987-654-3210' })
    anotherPhoneNumber: string;

    @ApiProperty({
        type: 'string',
        format: 'binary',
        isArray: true,
        nullable: false
    })
    idCard: Express.Multer.File[];

    @ApiProperty({
        type: 'string',
        format: 'binary',
        isArray: true,
        nullable: true
    })
    businessRegImages: Express.Multer.File[];

    @ApiProperty({ example: '123456789' })
    taxCode: string;

    @ApiProperty({
        type: 'string',
        format: 'binary',
        isArray: true,
        nullable: false
    })
    taxCodeImages: Express.Multer.File[];

    @ApiProperty({
        type: 'string',
        format: 'binary',
        isArray: true,
        nullable: true
    })
    relatedImages: Express.Multer.File[];

    @ApiProperty({ example: 'ACME Inc.' })
    companyName: string;

    @ApiProperty({ example: '123 Main St' })
    companyAddress: string;

    @ApiProperty({ example: 'Jane Smith' })
    fullNameOfRepresentative: string;

}
