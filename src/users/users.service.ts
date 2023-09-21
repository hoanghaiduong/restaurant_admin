import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {

  }
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const creating = this.userRepository.create(createUserDto);
      return await this.userRepository.save(creating);
    } catch (error) {
      throw new BadRequestException("Error creating user")
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOneUserExists(uid: string): Promise<User | boolean> {
    const user = await this.userRepository.findOne({
      where: {
        uid: uid,
      }
    });
    if (!user) return false;//return false if user does not exist
    return user;//return user if user exists
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
