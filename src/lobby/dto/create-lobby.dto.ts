import { ApiProperty } from '@nestjs/swagger';

export class CreateLobbyDto {
    @ApiProperty({ example: 'My Lobby', description: 'The name of the lobby' })
    name: string;

    @ApiProperty({ example: 'A beautiful lobby', description: 'The description of the lobby', required: false })
    description?: string;

    @ApiProperty({ example: 10, description: 'The maximum number of tables in the lobby' })
    maxOfNumberTable: number;

    @ApiProperty({ example: 2, description: 'The number of floors in the lobby', required: false })
    numberOfFloors?: number;

    @ApiProperty({ type: 'string', format: 'binary', required: false })
    photo?: Express.Multer.File;

    @ApiProperty({ type: 'string', format: 'binary', isArray: true, required: false })
    images?: Express.Multer.File[];

    @ApiProperty({ example: '1000 sqft', description: 'The acreage of the lobby', required: false })
    acreage?: string;
}
