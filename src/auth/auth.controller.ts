import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import {
  SignInDto,
  signInSchema,
  SignUpDto,
  signUpSchema,
} from './dto/auth.dto';
import { ZodValidationPipe } from 'src/shared/pipes/zod.pipe';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UsePipes(new ZodValidationPipe(signInSchema))
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  @UsePipes(new ZodValidationPipe(signUpSchema))
  signUp(@Body() signUpDto: SignUpDto) {
    console.log(signUpDto);
    return this.authService.signUp(
      signUpDto.first_name,
      signUpDto.last_name,
      signUpDto.phone,
      signUpDto.email,
      signUpDto.password,
    );
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
