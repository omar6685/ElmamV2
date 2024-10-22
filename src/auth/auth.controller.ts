import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';

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
  signIn(@Body() signInDto: SignInDto, @Req() request: ExpressRequest) {
    return this.authService.signIn(
      signInDto.email,
      signInDto.password,
      signInDto.fcm_token,
      request,
    );
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  @UsePipes(new ZodValidationPipe(signUpSchema))
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(
      signUpDto.firstName,
      signUpDto.lastName,
      signUpDto.phone,
      signUpDto.email,
      signUpDto.password,
      signUpDto.fcm_token,
    );
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  @HttpCode(HttpStatus.OK)
  getProfile(@Request() req) {
    return req.user;
  }
}
