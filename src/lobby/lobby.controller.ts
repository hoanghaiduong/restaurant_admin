import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, UploadedFiles } from '@nestjs/common';
import { LobbyService } from './lobby.service';
import { CreateLobbyDto } from './dto/create-lobby.dto';
import { UpdateLobbyDto } from './dto/update-lobby.dto';
import { ApiTags } from '@nestjs/swagger';
import { Lobby } from './entities/lobby.entity';
import { PaginationModel } from 'src/common/pagination/pagination.model';
import { Pagination } from 'src/common/pagination/pagination.dto';
import { ApiFileFields } from 'src/common/decorators/file.decorator';

@Controller('lobby')
@ApiTags("API Sảnh tiệc")
export class LobbyController {
  constructor(private readonly lobbyService: LobbyService) { }

  @Get()
  async findAll(@Query() pagination: Pagination): Promise<PaginationModel<Lobby>> {
    return this.lobbyService.findAll(pagination);
  }

  @Get('get')
  async findOne(@Query('id') id: string): Promise<Lobby> {
    return this.lobbyService.findOne(id);
  }

  @ApiFileFields([
    {
      name: 'photo',
      maxCount: 1
    },
    {
      name: 'images',
      maxCount: 5
    }
  ])
  @Post('create')
  async create(@Body() lobbyDto: CreateLobbyDto, @UploadedFiles() files?: {
    photo?: Express.Multer.File,
    images?: Express.Multer.File[]
  }): Promise<Lobby> {
    return await this.lobbyService.create({
      ...lobbyDto,
      photo: files?.photo[0],
      images: files?.images
    });
  }

  @Put('update')
  async update(
    @Query('id') id: string,
    @Body() lobbyDto: CreateLobbyDto,
  ): Promise<Lobby> {
    return this.lobbyService.update(id, lobbyDto);
  }

  @Delete('delete')
  async remove(@Query('id') id: string): Promise<object> {
    return this.lobbyService.remove(id);
  }

}
