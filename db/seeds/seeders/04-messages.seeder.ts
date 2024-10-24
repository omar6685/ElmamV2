import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Message } from 'src/messages/entities/message.entity';
import { User } from 'src/users/entities/user.entity';

export default class MessageSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    await dataSource.query('TRUNCATE "messages" RESTART IDENTITY CASCADE;');

    const messageRepository = dataSource.getRepository(Message);
    const userRepository = dataSource.getRepository(User);

    // Fetch all users
    const users = await userRepository.find();
    if (users.length === 0) {
      throw new Error('No users found. Make sure UsersSeeder has run successfully.');
    }

    const messages = users.map((user) => ({
      title: `Message for ${user.firstName}`,
      seen: false,
      user, // Associating message with user
    }));

    await messageRepository.save(messages);
    console.log('Messages Seeded ✅');
  }
}
