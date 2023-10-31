import { BadRequestException, Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ILike, Repository } from 'typeorm';
import { Pagination } from 'src/common/pagination/pagination.dto';
import { PaginationModel } from 'src/common/pagination/pagination.model';
import { Meta } from 'src/common/pagination/meta.dto';
import { RolesService } from 'src/roles/roles.service';
import { StorageService } from 'src/storage/storage.service';
import { ImageTypes } from 'src/common/enum/file';
import { Role } from 'src/roles/entities/role.entity';

@Injectable()

export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>,
    private readonly roleService: RolesService,
    private readonly storageService: StorageService
  ) {

  }
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const creating = this.userRepository.create(createUserDto);
      return await this.userRepository.save(creating);
    } catch (error) {
      throw new BadRequestException("Error creating user")
    }
  }

  async grantAccess(uid: string): Promise<User> {
    try {
      const user = await this.findOne(uid);
      const role = await this.roleService.findOneByName('admin');
      user.role = role;
      return await this.userRepository.save(user);
    } catch (error) {
      throw new BadRequestException("Error requesting access to user ");
    }
  }

  async findAll(pagination: Pagination): Promise<PaginationModel<User>> {
    const [entities, itemCount] = await this.userRepository.findAndCount({
      take: pagination.take,
      skip: pagination.skip,
      order: {
        createdAt: pagination.order
      },
      relations: ["role"],
      where: {
        displayName: pagination.search ? ILike(`%${pagination.search}%`) : null
      }
    });
    const meta = new Meta({ pagination, itemCount });
    return new PaginationModel<User>(entities, meta);
  }

  async findOne(uid: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { uid }
    })
    if (!user) throw new NotFoundException(`User ${uid} not found`);
    return user;
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


  async update(uid: string, updateUserDto: UpdateUserDto): Promise<User | any> {
    const user = await this.findOne(uid);
    let role: Role;
    if (updateUserDto.roleId) {
      role = await this.roleService.findOne(updateUserDto.roleId);
    }

    let merged: User;
    let photoURL: string;
    if (!updateUserDto.photoURL) {
      photoURL = user.photoURL;
    }
    else {
      if (user.photoURL !== null) {
        console.log(user.photoURL)
        await this.storageService.deleteFile(user.photoURL);
      }


      photoURL = await this.storageService.uploadFile(ImageTypes.CARD_USER, updateUserDto.photoURL);
    }

    if (user.role.name === "admin") {
      merged = this.userRepository.merge(user, {
        ...updateUserDto,
        photoURL,
        role,
      })
      console.log("Admin updated role")
    }
    merged = this.userRepository.merge(user, {
      ...updateUserDto,
      photoURL,
      role: updateUserDto.roleId ? role : user.role
    })
    await this.userRepository.update(uid, merged);

    return await this.findOne(uid);

  }


  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
