import { Injectable } from '@nestjs/common';
import { CreateLobbyDto } from './dto/create-lobby.dto';
import { UpdateLobbyDto } from './dto/update-lobby.dto';
import { Pagination } from 'src/common/pagination/pagination.dto';
import { PaginationModel } from 'src/common/pagination/pagination.model';
import { Lobby } from './entities/lobby.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meta } from 'src/common/pagination/meta.dto';

@Injectable()
export class LobbyService {
  constructor(@InjectRepository(Lobby) private lobbyRepository: Repository<Lobby>) {

  }
  async create(createLobbyDto: CreateLobbyDto): Promise<Lobby> {
    return;
  }

  async findAll(pagination: Pagination): Promise<PaginationModel<Lobby>> {
    const [entities, itemCount] = await this.lobbyRepository.findAndCount({
      skip: pagination.skip,
      take: pagination.take,
      order: {

      }
    })
    const meta = new Meta({ itemCount, pagination });
    return new PaginationModel<Lobby>(entities, meta);
  }

  findOne(id: number) {
    return `This action returns a #${id} lobby`;
  }

  update(id: number, updateLobbyDto: UpdateLobbyDto) {
    return `This action updates a #${id} lobby`;
  }

  remove(id: number) {
    return `This action removes a #${id} lobby`;
  }
}
