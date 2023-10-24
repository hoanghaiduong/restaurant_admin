import { ApiProperty } from "@nestjs/swagger";

export class LocationDto {
    @ApiProperty({ example: 42.123 }) // Example for 'lat'
    lat: number;

    @ApiProperty({ example: -71.456 }) // Example for 'lng'
    lng: number;

    @ApiProperty({ example: 1, description: 'A required integer', required: false, default: 1 }) // Example for 'point'
    point?: number;
}