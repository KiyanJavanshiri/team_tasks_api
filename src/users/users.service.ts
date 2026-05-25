import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async findUserByEmail(email: string) {
    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException(`user with email ${email} was not found`);
    }

    return user;
  }

  async findUserById(id: number) {
    const user = await this.usersRepository.findOneBy({
      id,
    });

    if (!user) {
      throw new NotFoundException(`user with id ${id} was not found`);
    }

    return user;
  }

  async createUser(dto: CreateUserDto) {
    const user = this.usersRepository.create(dto);

    return await this.usersRepository.save(user);
  }

  async deleteUserById(id: number) {
    const user = await this.usersRepository.findOneBy({
      id,
    });

    if (!user) {
      throw new NotFoundException(`user with id ${id} was not found`);
    }

    await this.usersRepository.remove(user);
  }
}
