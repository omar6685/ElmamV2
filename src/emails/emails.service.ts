import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import { Repository } from 'typeorm';
import { SentMessageInfo } from 'nodemailer';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

import { EmailTemplate } from './entities/email.entity';

@Injectable()
export class EmailsService {
  private readonly logger = new Logger(EmailsService.name);

  constructor(
    private readonly mailerService: MailerService,
    private readonly schedulerRegistry: SchedulerRegistry,
    @InjectRepository(EmailTemplate)
    private emailTemplateRepository: Repository<EmailTemplate>,
  ) {}

  // Send email
  async sendEmail(to: string, subject: string, content: string) {
    try {
      const response: SentMessageInfo = await this.mailerService.sendMail({
        to,
        subject,
        html: content, // Content as HTML
      });

      return {
        message: 'Email sent successfully',
        accepted: response.accepted,
        rejected: response.rejected,
      };
    } catch (error) {
      console.error('Failed to send email', error);
      throw new Error('Failed to send email');
    }
  }

  // Send email using template from DB
  async sendEmailFromTemplate(
    to: string,
    templateName: string,
    variables: Record<string, any>,
  ) {
    const template = await this.emailTemplateRepository.findOne({
      where: { name: templateName },
    });

    if (!template) {
      throw new Error('Email template not found');
    }

    // Optionally, replace placeholders in the template content with variables
    const content = this.replaceTemplateVariables(template.content, variables);

    await this.sendEmail(to, template.subject, content);
  }

  async getAllScheduledBatches() {
    const cronJobs = this.schedulerRegistry.getCronJobs();
    const jobs = [];
    cronJobs.forEach((job, key) => {
      jobs.push({
        name: key,
        nextExecution: job.nextDates().toLocaleString(),
        lastExecution: job.lastExecution,
      });
    });
    return jobs;
  }

  // Schedule an email to be sent once
  async scheduleEmail(
    to: string,
    subject: string,
    content: string,
    sendDate: Date,
  ) {
    const job = new CronJob(sendDate, () => {
      this.sendEmail(to, subject, content);
      this.logger.log(
        `Scheduled email for ${to} at ${sendDate} sent successfully ✅`,
      );
    });

    this.schedulerRegistry.addCronJob(`email-${to}-${sendDate}`, job);
    job.start();

    this.logger.log(`Scheduled email for ${to} at ${sendDate}`);
    return { message: `Scheduled email to be sent at ${sendDate}` };
  }

  // Schedule a recurring email
  async scheduleRecurringEmail(
    to: string,
    subject: string,
    content: string,
    cronPattern: string,
  ) {
    const interval = this.getCronPattern(cronPattern);
    const job = new CronJob(interval, () => {
      this.sendEmail(to, subject, content);
      this.logger.log(
        `Scheduled recurring email for ${to} at ${new Date().toLocaleDateString()} sent successfully ✅`,
      );
    });

    this.schedulerRegistry.addCronJob(`recurring-email-${to}`, job);
    job.start();

    this.logger.log(
      `Scheduled recurring email for ${to} with pattern ${cronPattern}`,
    );
    return { message: `Scheduled recurring email with pattern ${cronPattern}` };
  }

  // Cancel a scheduled email by name
  cancelScheduledEmail(jobName: string) {
    const job = this.schedulerRegistry.getCronJob(jobName);
    if (job) {
      job.stop();
      this.schedulerRegistry.deleteCronJob(jobName);
      return { message: `Canceled scheduled email job: ${jobName}` };
    } else {
      throw new NotFoundException(`Job ${jobName} not found`);
    }
  }

  // Utility method to replace placeholders in email templates (e.g., {{name}})
  private replaceTemplateVariables(
    templateContent: string,
    variables: Record<string, any>,
  ): string {
    let content = templateContent;
    for (const key in variables) {
      const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
      content = content.replace(regex, variables[key]);
    }
    return content;
  }

  // Fetch all email templates
  async getAllTemplates(): Promise<EmailTemplate[]> {
    return this.emailTemplateRepository.find();
  }

  // Fetch a single email template by name
  async getTemplateByName(name: string): Promise<EmailTemplate | null> {
    return this.emailTemplateRepository.findOne({ where: { name } });
  }

  private getCronPattern(intervalCode: string): string {
    switch (intervalCode) {
      case '1m':
        return '* * * * *'; // Every minute
      case '1d':
        return '0 0 * * *'; // Every day
      case '7d':
        return '0 0 * * 0'; // Every Sunday
      case '1w':
        return '0 0 * * 0'; // Every Sunday
      case '2w':
        return '0 0 */14 * *'; // Every 2 weeks
      default:
        return '0 0 * * *'; // Default to daily
    }
  }
}
