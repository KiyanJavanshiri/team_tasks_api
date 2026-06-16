import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Login user' })
  @ApiOkResponse({ description: 'User successfully completed login' })
  @ApiUnauthorizedResponse({
    description: 'User is not registered or wrong credentials',
  })
  async login(@Body() dto: LoginUserDto) {
    return await this.authService.login(dto);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register user' })
  @ApiCreatedResponse({ description: 'User was registered' })
  @ApiConflictResponse({ description: 'User is already registered' })
  async register(@Body() dto: RegisterUserDto) {
    return await this.authService.register(dto);
  }
}
