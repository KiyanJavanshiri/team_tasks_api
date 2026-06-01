import { Controller, Post } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(dto: LoginUserDto) {
    return await this.authService.login(dto);
  }

  @Post('register')
  async register(dto: RegisterUserDto) {
    return await this.authService.register(dto);
  }
}
