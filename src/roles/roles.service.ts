import { BadRequestException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { override } from 'joi';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { ILike, Repository } from 'typeorm';
import { Pagination } from 'src/common/pagination/pagination.dto';
import { PaginationModel } from 'src/common/pagination/pagination.model';
import { Meta } from 'src/common/pagination/meta.dto';

type findOneRoleWith = "user" | "admin" | "restaurant"

@Injectable()
export class RolesService implements OnModuleInit {
  constructor(@InjectRepository(Role) private roleRepository: Repository<Role>) {

  }
  async onModuleInit(): Promise<any> {
    const roleNamesToCreate = ['admin', 'restaurant', 'user'];
    const roleCreationPromises = roleNamesToCreate.map(async (roleName) => {
      const existingRole = await this.roleRepository.findOne({
        where: { name: roleName }
      });


      if (!existingRole) {
        const role = this.roleRepository.create({ name: roleName, actived: true });
        await this.roleRepository.save(role);
      }
    });

    // Chạy tất cả các promise đồng thời
    await Promise.all(roleCreationPromises);
  }

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    try {
      const creating = this.roleRepository.create(createRoleDto);
      return await this.roleRepository.save(creating);
    } catch (error) {
      throw new BadRequestException({
        message: error.message,
      })
    }
  }

  async findAll(pagination: Pagination): Promise<PaginationModel<Role>> {
    const [entities, itemCount] = await this.roleRepository.findAndCount({
      where: {
        name: pagination.search ? ILike(`%${pagination.search}%`) : null
      },
      skip: pagination.skip,
      take: pagination.take
    });

    const meta = new Meta({ pagination, itemCount });
    return new PaginationModel(entities, meta);
  }

  async findOne(id: string): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: {
        id: id
      }
    })
    if (!role) throw new NotFoundException('Role not found')
    return role
  }
  async findOneByName(name: findOneRoleWith): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: {
        name
      }
    })
    if (!role) throw new NotFoundException('Role not found')
    return role
  }
  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
    try {
      const role = await this.findOne(id);
      return await this.roleRepository.save({
        ...role,
        ...updateRoleDto
      })
    } catch (error) {
      throw new BadRequestException({
        message: error.message,
      })
    }
  }

  async remove(id: string): Promise<Object> {
    const role = await this.findOne(id);
    await this.roleRepository.remove(role);
    return {
      status: 200,
      message: 'Role deleted successfully'
    }
  }
}
