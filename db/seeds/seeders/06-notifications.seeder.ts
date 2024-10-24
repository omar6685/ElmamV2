import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Notification } from 'src/notifications/entities/notification.entity';
import { User } from 'src/users/entities/user.entity';
import { Message } from 'src/messages/entities/message.entity';
import { NotificationToken } from 'src/notifications/entities/notification-token.entity';

export default class NotificationSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    await dataSource.query(
      'TRUNCATE "notifications" RESTART IDENTITY CASCADE;',
    );

    const notificationRepository = dataSource.getRepository(Notification);
    const userRepository = dataSource.getRepository(User);
    const messageRepository = dataSource.getRepository(Message);
    const notificationTokenRepository =
      dataSource.getRepository(NotificationToken);

    const users = await userRepository.find();
    const messages = await messageRepository.find();
    const tokens = await notificationTokenRepository.find();

    if (users.length === 0 || messages.length === 0 || tokens.length === 0) {
      throw new Error(
        'No users, messages, or tokens found. Ensure all seeders have run.',
      );
    }

    const notifications: Partial<Notification>[] = users.map((user) => ({
      userId: user.id,
      messageId: messages[Math.floor(Math.random() * messages.length)].id,
      title: `Notification for ${user.firstName}`,
      seen: false,
      content: 'This is a test notification',
      notificationToken: tokens[Math.floor(Math.random() * tokens.length)],
    }));

    await notificationRepository.save(notifications);
    console.log('Notifications Seeded ✅');
  }
}
