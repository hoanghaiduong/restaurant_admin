import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLobbyDto } from './dto/create-lobby.dto';
import { UpdateLobbyDto } from './dto/update-lobby.dto';
import { Pagination } from 'src/common/pagination/pagination.dto';
import { PaginationModel } from 'src/common/pagination/pagination.model';
import { Lobby } from './entities/lobby.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Meta } from 'src/common/pagination/meta.dto';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { StorageService } from 'src/storage/storage.service';
import { ImageTypes } from 'src/common/enum/file';

@Injectable()
export class LobbyService {
  constructor(
    @InjectRepository(Lobby)
    private readonly lobbiesRepository: Repository<Lobby>,
    private readonly restaurantService: RestaurantService,
    private readonly storageService: StorageService
  ) { }

  async findAll(pagination: Pagination): Promise<PaginationModel<Lobby>> {
    const [entities, itemCount] = await this.lobbiesRepository.findAndCount({
      skip: pagination.skip,
      take: pagination.take,
      where: {
        name: pagination.search ? ILike(`%${pagination.search}%`) : null
      },
      order: {
        createdAt: pagination.order
      }

    })
    const meta = new Meta({ itemCount, pagination });
    return new PaginationModel<Lobby>(entities, meta);
  }

  async findOne(id: string): Promise<Lobby> {
    const lobby = await this.lobbiesRepository.findOne({
      where: { id }
    });
    if (!lobby) throw new NotFoundException()
    return lobby
  }

  async create(dto: CreateLobbyDto): Promise<Lobby> {
    const imagesToDelete: string[] = [];
    try {
      const restaurant = await this.restaurantService.findOne(dto.restaurantId);
      const photo = await this.storageService.uploadFile(`${restaurant.name}/${ImageTypes.CARD_LOBBY}`, dto.photo);
      const images = dto.images ? await this.storageService.uploadMultiFiles(`${restaurant.name}/${ImageTypes.CARD_LOBBY}`, dto.images) : null;
      imagesToDelete.push(photo, ...images);
      const creating = this.lobbiesRepository.create({
        ...dto,
        restaurant,
        photo,
        images
      })
      return await this.lobbiesRepository.save(creating);
    } catch (error) {
      await this.storageService.deleteMultiFiles(imagesToDelete);
      throw new BadRequestException(error)
    }

  }

  async update(id: string, lobbyDto: CreateLobbyDto): Promise<Lobby> {
    try {

    } catch (error) {
      throw new BadRequestException(error)
    }

    return;
  }

  async remove(id: string): Promise<object> {
    try {
      const removing = await this.findOne(id);
      await this.lobbiesRepository.remove(removing);
      return {
        message: 'Removed lobby by id ' + id + ' successfully'
      }
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
