import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('id')
  async findUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.findUserById(id);
  }

  @Post()
  async createUser(@Body() dto: CreateUserDto) {
    return await this.usersService.createUser(dto);
  }

  @Delete('id')
  @HttpCode(204)
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    await this.usersService.deleteUserById(id);
  }
}
