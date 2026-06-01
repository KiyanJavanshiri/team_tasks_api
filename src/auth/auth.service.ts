import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from './dto/login-user.dto';
import bcrypt from 'bcryptjs';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginUserDto) {
    const user = await this.userService.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('User was not found');
    }

    const isCorrectPassword = await this.checkCorrectnessOfPassword(
      password,
      user.password,
    );

    if (!isCorrectPassword) {
      throw new UnauthorizedException('Wrong credentials');
    }

    const { id, name, avatar } = user;

    const token = await this.generateToken({ id, name });

    return {
      access_token: token,
      payload: {
        name,
        avatar,
      },
    };
  }

  async register(dto: RegisterUserDto) {
    const user = await this.userService.findUserByEmail(dto.email);

    if (user) {
      throw new ConflictException('User is already exists');
    }

    const hashedPassword = await this.hashPassword(dto.password);

    const { id, name, avatar } = await this.userService.createUser({
      ...dto,
      password: hashedPassword,
    });

    const token = await this.generateToken({ id, name });

    return {
      access_token: token,
      payload: {
        name,
        avatar,
      },
    };
  }

  private async checkCorrectnessOfPassword(
    password: string,
    hashedPassword: string,
  ) {
    return await bcrypt.compare(password, hashedPassword);
  }

  private async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  private async generateToken(claims: { id: number; name: string }) {
    return await this.jwtService.signAsync(claims);
  }
}
