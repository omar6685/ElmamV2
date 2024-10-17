import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { EmailsService } from './emails.service';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { RolesEnum } from 'src/shared/enums/role.enum';
import { Roles } from 'src/shared/decorators/roles.decorator';

@Controller('emails')
@UseGuards(RolesGuard)
export class EmailsController {
  constructor(private readonly emailsService: EmailsService) {}

  // Send email directly
  @Post('send')
  @HttpCode(HttpStatus.ACCEPTED)
  @Roles(RolesEnum.ADMIN, RolesEnum.CUSTOMER)
  async sendEmail(
    @Body('to') to: string,
    @Body('subject') subject: string,
    @Body('content') content: string,
  ) {
    return this.emailsService.sendEmail(to, subject, content);
  }

  // Send email using template
  @Post('send-template')
  @HttpCode(HttpStatus.ACCEPTED)
  @Roles(RolesEnum.ADMIN, RolesEnum.CUSTOMER)
  async sendEmailFromTemplate(
    @Body('to') to: string,
    @Body('templateName') templateName: string,
    @Body('variables') variables: Record<string, any>,
  ) {
    return this.emailsService.sendEmailFromTemplate(
      to,
      templateName,
      variables,
    );
  }

  // Get all email templates
  @Get('templates')
  @HttpCode(HttpStatus.OK)
  @Roles(RolesEnum.ADMIN, RolesEnum.CUSTOMER)
  async getAllTemplates() {
    return this.emailsService.getAllTemplates();
  }

  // Get a single email template by name
  @Get('templates/:name')
  @HttpCode(HttpStatus.OK)
  @Roles(RolesEnum.ADMIN, RolesEnum.CUSTOMER)
  async getTemplateByName(@Param('name') name: string) {
    return this.emailsService.getTemplateByName(name);
  }
}
