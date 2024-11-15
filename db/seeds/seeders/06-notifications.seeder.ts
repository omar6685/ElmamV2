import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource, Repository } from 'typeorm';
import * as fs from 'fs';
import * as csv from 'fast-csv';

import { Notification } from 'src/notifications/entities/notification.entity';
import { User } from 'src/users/entities/user.entity';
import { Message } from 'src/messages/entities/message.entity';
import { NotificationToken } from 'src/notifications/entities/notification-token.entity';

export default class NotificationSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    console.log('Notifications seeding in progress... ⏳');
    return
    await dataSource.query(
      'TRUNCATE "notifications" RESTART IDENTITY CASCADE;',
    );

    const notificationRepository = dataSource.getRepository(Notification);
    const userRepository = dataSource.getRepository(User);
    const messageRepository = dataSource.getRepository(Message);
    const notificationTokenRepository =
      dataSource.getRepository(NotificationToken);
    const filePath =
      '/home/zineddine-bk/Desktop/Elmam/elmam-backend/db/data/notifications.csv';

    const users = await userRepository.find();
    const messages = await messageRepository.find();
    const tokens = await notificationTokenRepository.find();

    if (users.length === 0) {
      throw new Error('No users found. Ensure all seeders have run.');
    }

    if (messages.length === 0) {
      throw new Error('No messages found. Ensure all seeders have run.');
    }

    if (tokens.length === 0) {
      throw new Error('No tokens found. Ensure all seeders have run.');
    }

    try {
      const notificationsData: Notification[] = await this.parseCsvFile(
        filePath,
        userRepository,
        messageRepository,
        notificationTokenRepository,
      );

      if (notificationsData.length > 0) {
        for (const notification of notificationsData) {
          // Check for existing user with the same email, unlockToken, or resetPasswordToken
          const existingNotification = await notificationRepository.findOne({
            where: [
              {
                userId: notification.userId,
                messageId: notification.messageId,
              },
            ],
          });

          // Only insert if no user found with matching unique fields
          if (!existingNotification) {
            await notificationRepository.save(notification);
          } else {
            console.warn(
              `Duplicate notification skipped: ${notification.title}`,
            );
          }
        }
        console.log('Notifications Seeded ✅');
      } else {
        console.warn('No notification data found in CSV.');
      }
    } catch (error) {
      console.error('Error seeding notifications ⛔');
    }
  }

  private async parseCsvFile(
    filePath: string,
    userRepository: Repository<User>,
    messageRepository: Repository<Message>,
    notificationTokenRepository: Repository<NotificationToken>,
  ): Promise<Notification[]> {
    return new Promise((resolve, reject) => {
      const notificationsData: Notification[] = [];

      fs.createReadStream(filePath)
        .pipe(csv.parse({ headers: true }))
        .on('data', async (data) => {
          const notification = new Notification();

          if (data.user_id === 'NULL' || data.message_id === 'NULL') {
            console.warn(
              `Missing user_id, message_id, or notification_token_id for notification: ${data.title}`,
            );
            return;
          }
          const user = await userRepository.findOne({
            where: { id: Number(data.user_id) },
          });
          const message = await messageRepository.findOne({
            where: { id: Number(data.message_id) },
          });

          if (!user || !message) {
            console.warn(
              `User or message not found for user_id: ${data.user_id}`,
            );
            return;
          }
          notification.userId = data.user_id;
          notification.messageId = data.message_id;
          notification.title = data.title;
          notification.seen = data.seen;
          notification.content = String(data.content);

          notificationsData.push(notification);
        })
        .on('end', () => resolve(notificationsData))
        .on('error', (error) => reject(error));
    });
  }
}
