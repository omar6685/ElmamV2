import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmailsService } from './emails.service';
import { EmailsController } from './emails.controller';
import { User } from 'src/users/entities/user.entity';
import { Message } from 'src/messages/entities/message.entity';
import { Notification } from 'src/notifications/entities/notification.entity';
import { NotificationToken } from 'src/notifications/entities/notification-token.entity';
import { EmailTemplate } from './entities/email.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Message,
      Notification,
      NotificationToken,
      EmailTemplate,
    ]),
  ],
  controllers: [EmailsController],
  providers: [EmailsService],
})
export class EmailsModule {}
