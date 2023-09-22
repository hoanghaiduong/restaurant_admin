import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PaginationModel } from 'src/common/pagination/pagination.model';
import { Role } from './entities/role.entity';
import { Pagination } from 'src/common/pagination/pagination.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('roles')
@ApiTags('API Roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  @Post('create')
  async create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get('gets')
  async findAll(@Query() pagination: Pagination): Promise<PaginationModel<Role>> {
    return this.rolesService.findAll(pagination)
  }

  @Get('get')
  async findOne(@Query('id') id: string): Promise<Role> {
    return await this.rolesService.findOne(id);
  }

  @Patch('update')
  async update(@Query('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return await this.rolesService.update(id, updateRoleDto);
  }

  @Delete('delete')
  async remove(@Query('id') id: string): Promise<Object> {
    return await this.rolesService.remove(id);
  }
}
