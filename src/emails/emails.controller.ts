import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
  Delete,
  UsePipes,
} from '@nestjs/common';

import { EmailsService } from './emails.service';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { RolesEnum } from 'src/shared/enums/role.enum';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { SendEmailDto } from './dto/send-email.dto';
import { SendEmailFromTemplateDto } from './dto/send-email-from-template.dto';
import { GetTemplateByNameDto } from './dto/get-template.dto';
import { ZodValidationPipe } from 'src/shared/pipes/zod.pipe';
import {
  cancelScheduledEmailDto,
  CancelScheduledEmailDto,
} from './dto/cancel-schedule-email.dto';
import { scheduleEmailDto, ScheduleEmailDto } from './dto/schedule-email.dto';
import {
  scheduleRecurringEmailDto,
  ScheduleRecurringEmailDto,
} from './dto/schedule-recurring.dto';

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

  // Get al scheduled emails
  @Get('scheduled-batches')
  @HttpCode(HttpStatus.OK)
  @Roles(RolesEnum.ADMIN)
  async getAllScheduledBatches() {
    return this.emailsService.getAllScheduledBatches();
  }

  // Schedule a one-time email
  @Post('schedule')
  @HttpCode(HttpStatus.ACCEPTED)
  @Roles(RolesEnum.ADMIN, RolesEnum.CUSTOMER)
  @UsePipes(new ZodValidationPipe(scheduleEmailDto))
  async scheduleEmail(@Body() scheduleEmailDto: ScheduleEmailDto) {
    const { to, subject, content, sendDate } = scheduleEmailDto;
    return this.emailsService.scheduleEmail(
      to,
      subject,
      content,
      new Date(sendDate),
    );
  }

  // Schedule a recurring email
  @Post('schedule-recurring')
  @HttpCode(HttpStatus.ACCEPTED)
  @Roles(RolesEnum.ADMIN, RolesEnum.CUSTOMER)
  @UsePipes(new ZodValidationPipe(scheduleRecurringEmailDto))
  async scheduleRecurringEmail(
    @Body() scheduleRecurringEmailDto: ScheduleRecurringEmailDto,
  ) {
    const { to, subject, content, interval } = scheduleRecurringEmailDto;
    return this.emailsService.scheduleRecurringEmail(
      to,
      subject,
      content,
      interval,
    );
  }

  // Cancel scheduled email
  @Delete('cancel/:jobName')
  @Roles(RolesEnum.ADMIN)
  @UsePipes(new ZodValidationPipe(cancelScheduledEmailDto))
  async cancelScheduledEmail(@Param() { jobName }: CancelScheduledEmailDto) {
    return this.emailsService.cancelScheduledEmail(jobName);
  }
}
