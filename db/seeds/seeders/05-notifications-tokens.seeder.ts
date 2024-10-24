import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { NotificationToken } from 'src/notifications/entities/notification-token.entity';
import { User } from 'src/users/entities/user.entity';

export default class NotificationTokenSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    await dataSource.query('TRUNCATE "notification_tokens" RESTART IDENTITY CASCADE;');

    const tokenRepository = dataSource.getRepository(NotificationToken);
    const userRepository = dataSource.getRepository(User);

    const users = await userRepository.find();
    if (users.length === 0) {
      throw new Error('No users found. Make sure UsersSeeder has run successfully.');
    }

    const tokens = users.map((user) => ({
      user,
      deviceType: 'mobile',
      notificationToken: `${user.email}-token`,
      status: 'ACTIVE',
    }));

    await tokenRepository.save(tokens);
    console.log('Notification Tokens Seeded ✅');
  }
}
