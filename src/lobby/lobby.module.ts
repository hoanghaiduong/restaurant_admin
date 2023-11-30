import { Module } from '@nestjs/common';
import { LobbyService } from './lobby.service';
import { LobbyController } from './lobby.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lobby } from './entities/lobby.entity';
import { StorageService } from 'src/storage/storage.service';
import { RestaurantModule } from 'src/restaurant/restaurant.module';

@Module({
  imports: [TypeOrmModule.forFeature([Lobby]), RestaurantModule],
  controllers: [LobbyController],
  providers: [LobbyService, StorageService],
  exports: [LobbyService]
})
export class LobbyModule { }
