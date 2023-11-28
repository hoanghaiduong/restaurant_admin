import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsISO8601, IsNotEmpty, IsString, IsUUID, ValidateIf, ValidateNested } from "class-validator";

export class DaySchedule {
    @ApiProperty()
    isOpen: boolean;


    @ApiProperty({
        example: [
            {
                morning: {
                    startTime: "08:00:00",
                    endTime: "09:00:00"
                },
                afternoon: {
                    startTime: "12:00:00",
                    endTime: "13:00:00"
                },
                evening: {
                    startTime: "18:00:00",
                    endTime: "19:00:00"
                }
            }
        ]
    })
    @Transform(({ value }) =>
        typeof value === "string" ? [value] : value
    )
    @ValidateIf((object, value) => object.isOpen) // Validate only if isOpen is true
    @IsNotEmpty({ message: "timeSlots is required when isOpen is true" })
    @ValidateNested({ each: true })
    @IsISO8601({
    }, { each: true })
    timeSlots?: OpenCloseTime[];
}

export class StartToEndTime {
    @ApiProperty()
    @IsString()
    @IsISO8601({ strict: true }, { message: "Invalid time format. Please use the HH:mm:ss format." })
    startTime: string;

    @ApiProperty()
    @IsString()
    @IsISO8601({ strict: true }, { message: "Invalid time format. Please use the HH:mm:ss format." })
    endTime: string;
}
export class OpenCloseTime {
    @ApiProperty()
    @ValidateNested({ each: true })
    @IsISO8601({}, { each: true })
    morning?: StartToEndTime;

    @ApiProperty()
    @ValidateNested({ each: true })
    @IsISO8601({}, { each: true })
    afternoon?: StartToEndTime;

    @ApiProperty()
    @ValidateNested({ each: true })
    @IsISO8601({}, { each: true })
    evening?: StartToEndTime;
}
