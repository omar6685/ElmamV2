import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NotificationsService } from './notifications.service';
import { User } from 'src/users/entities/user.entity';
import { NotificationsController } from './notifications.controller';
import { Message } from '../messages/entities/message.entity';
import { Notification } from './entities/notification.entity';
import { NotificationToken } from './entities/notification-token.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Message, Notification, NotificationToken]),
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
