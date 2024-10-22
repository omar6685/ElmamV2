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
import { SendEmailDto } from './dto/send-email.dto';
import { SendEmailFromTemplateDto } from './dto/send-email-from-template.dto';
import { GetTemplateByNameDto } from './dto/get-template.dto';

@Controller('emails')
@UseGuards(RolesGuard)
export class EmailsController {
  constructor(private readonly emailsService: EmailsService) {}

  // Send email directly
  @Post('send')
  @HttpCode(HttpStatus.ACCEPTED)
  @Roles(RolesEnum.ADMIN, RolesEnum.CUSTOMER)
  async sendEmail(@Body() sendEmailDto: SendEmailDto) {
    return this.emailsService.sendEmail(
      sendEmailDto.to,
      sendEmailDto.subject,
      sendEmailDto.content,
    );
  }

  // Send email using template
  @Post('send-template')
  @HttpCode(HttpStatus.ACCEPTED)
  @Roles(RolesEnum.ADMIN, RolesEnum.CUSTOMER)
  async sendEmailFromTemplate(
    @Body() sendEmailFromTemplateDto: SendEmailFromTemplateDto,
  ) {
    return this.emailsService.sendEmailFromTemplate(
      sendEmailFromTemplateDto.to,
      sendEmailFromTemplateDto.templateName,
      sendEmailFromTemplateDto.variables,
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
  async getTemplateByName(@Param() getTemplateByNameDto: GetTemplateByNameDto) {
    return this.emailsService.getTemplateByName(getTemplateByNameDto.name);
  }
}
