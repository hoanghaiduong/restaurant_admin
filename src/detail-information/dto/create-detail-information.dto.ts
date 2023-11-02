import { ApiProperty } from "@nestjs/swagger";
import { DaySchedule } from "src/common/interface/Open-closeTime";

export class CreateDetailInformationDto {


    @ApiProperty({ nullable: false }) // Một ví dụ cho mối quan hệ một-đến-một
    restaurantId: string;
    @ApiProperty({ example: { isOpen: true, timeSlots: [{ morning: '08:00-9:00', afternoon: '12:00-13:00', evening: '12:00-13:00' }] } })
    sunday: DaySchedule;

    @ApiProperty({ example: { isOpen: true, timeSlots: [{ morning: '08:00-9:00', afternoon: '12:00-13:00', evening: '12:00-13:00' }] } })
    monday: DaySchedule;

    @ApiProperty({ example: { isOpen: true, timeSlots: [{ morning: '08:00-9:00', afternoon: '12:00-13:00', evening: '12:00-13:00' }] } })
    tuesday: DaySchedule;

    @ApiProperty({ example: { isOpen: true, timeSlots: [{ morning: '08:00-9:00', afternoon: '12:00-13:00', evening: '12:00-13:00' }] } })
    wednesday: DaySchedule;

    @ApiProperty({ example: { isOpen: true, timeSlots: [{ morning: '08:00-9:00', afternoon: '12:00-13:00', evening: '12:00-13:00' }] } })
    thursday: DaySchedule;
    @ApiProperty({ example: { isOpen: true, timeSlots: [{ morning: '08:00-9:00', afternoon: '12:00-13:00', evening: '12:00-13:00' }] } })
    friday: DaySchedule;

    @ApiProperty({ example: { isOpen: true, timeSlots: [{ morning: '08:00-9:00', afternoon: '12:00-13:00', evening: '12:00-13:00' }] } })
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
    typeOfServiceIds: string[];


}
