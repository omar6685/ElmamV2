import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import { Repository } from 'typeorm';

import { EmailTemplate } from './entities/email.entity';
import { SentMessageInfo } from 'nodemailer';

@Injectable()
export class EmailsService {
  constructor(
    private readonly mailerService: MailerService,
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
      console.log('Email sent successfully!', response);
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
}
