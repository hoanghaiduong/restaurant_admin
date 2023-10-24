import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, UploadedFile, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { PaginationModel } from 'src/common/pagination/pagination.model';
import { Pagination } from 'src/common/pagination/pagination.dto';
import { ApiTags } from '@nestjs/swagger';
import { FirebaseAuthGuard } from 'src/auth/guard/firebase.guard';
import { ApiFile } from 'src/common/decorators/file.decorator';
import { FileTypes } from 'src/common/enum/file';
import { RoleGuard } from 'src/auth/guard/Role.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UpdateUserByAdminDto } from './dto/update-user-admin.dto';

@Controller('users')
@ApiTags("User API")
@UseGuards(RoleGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  // @Post()
  // async create(@Body() createUserDto: CreateUserDto) :Promise<User> {
  //   return await this.usersService.create(createUserDto);
  // }

  @Roles('admin')
  @Get('gets')
  async findAll(@Query() pagination: Pagination): Promise<PaginationModel<User>> {
    return await this.usersService.findAll(pagination);
  }

  @Roles('admin', 'user', 'restaurant')
  @Get('get')
  async findOne(@Query('uid') uid: string): Promise<User> {
    return await this.usersService.findOne(uid);
  }

  @Roles('admin', 'user', 'restaurant')
  @Patch('update')
  @ApiFile('photoURL', FileTypes.IMAGE)
  async update(@Req() req, @Body() updateUserDto: UpdateUserByAdminDto, @UploadedFile() photoURL: Express.Multer.File) {
    return await this.usersService.update(req.uid, {
      ...updateUserDto,
      photoURL
    });
  }

  @Roles('admin')
  @Patch('update-by-admin')
  @ApiFile('photoURL', FileTypes.IMAGE)
  async updateUserByAdmin(@Query('uid') uid: string, @Body() updateUserDto: UpdateUserDto, @UploadedFile() photoURL: Express.Multer.File) {
    return await this.usersService.update(uid, {
      ...updateUserDto,
      photoURL
    });
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
