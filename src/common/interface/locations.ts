import { IsNumber, IsObject, ValidateNested, IsInt } from 'class-validator';
export class Location {
    @IsNumber()
    lat: number;

    @IsNumber()
    lng: number;

    @IsInt({
        message: "The location point is not a number required integer",
    })
    point: number;
}