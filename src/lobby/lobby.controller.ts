import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LobbyService } from './lobby.service';
import { CreateLobbyDto } from './dto/create-lobby.dto';
import { UpdateLobbyDto } from './dto/update-lobby.dto';
import { ApiTags } from '@nestjs/swagger';
import { Lobby } from './entities/lobby.entity';
import { PaginationModel } from 'src/common/pagination/pagination.model';
import { Pagination } from 'src/common/pagination/pagination.dto';

@Controller('lobby')
@ApiTags("API Sảnh tiệc")
export class LobbyController {
  constructor(private readonly lobbyService: LobbyService) { }

  @Post('create')
  async create(@Body() createLobbyDto: CreateLobbyDto): Promise<Lobby> {
    return await this.lobbyService.create(createLobbyDto);
  }

  @Get('gets')
  async findAll(pagination: Pagination): Promise<PaginationModel<Lobby>> {
    return await this.lobbyService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lobbyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLobbyDto: UpdateLobbyDto) {
    return this.lobbyService.update(+id, updateLobbyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lobbyService.remove(+id);
  }
}
