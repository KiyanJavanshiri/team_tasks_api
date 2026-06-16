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
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('id')
  @ApiOperation({ summary: 'Find an user by id' })
  @ApiOkResponse({ description: 'Founded user' })
  @ApiNotFoundResponse({ description: 'User with given id is not exists' })
  async findUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.findUserById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create an user' })
  @ApiCreatedResponse({ description: 'User was created' })
  async createUser(@Body() dto: CreateUserDto) {
    return await this.usersService.createUser(dto);
  }

  @Delete('id')
  @HttpCode(204)
  @ApiOperation({ summary: 'remove an user' })
  @ApiNoContentResponse()
  @ApiNotFoundResponse({ description: 'User with given id is not exists' })
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    await this.usersService.deleteUserById(id);
  }
}
