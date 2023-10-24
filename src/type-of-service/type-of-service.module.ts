import { Module } from '@nestjs/common';
import { TypeOfServiceService } from './type-of-service.service';
import { TypeOfServiceController } from './type-of-service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOfService } from './entities/type-of-service.entity';

@Module({
  imports:[TypeOrmModule.forFeature([TypeOfService])],
  controllers: [TypeOfServiceController],
  providers: [TypeOfServiceService],
  exports:[TypeOfServiceService]
})
export class TypeOfServiceModule {}
