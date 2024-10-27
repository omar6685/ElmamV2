import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import * as fs from 'fs';
import * as csv from 'fast-csv';

import { Message } from 'src/messages/entities/message.entity';
import { User } from 'src/users/entities/user.entity';

export default class MessageSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    console.log('Messages seeding in progress... ⏳');

    await dataSource.query('TRUNCATE "messages" RESTART IDENTITY CASCADE;');

    const messageRepository = dataSource.getRepository(Message);
    const userRepository = dataSource.getRepository(User);
    const filePath =
      '/home/zineddine-bk/Desktop/Elmam/elmam-backend/db/data/messages.csv';

    // Fetch all users
    const users = await userRepository.find();
    if (users.length === 0) {
      throw new Error(
        'No users found. Make sure UsersSeeder has run successfully.',
      );
    }

    try {
      const messagesData: Message[] = await this.parseCsvFile(filePath);

      if (messagesData.length > 0) {
        for (const message of messagesData) {
          if (message.userId) {
            await messageRepository.save(message);
          }
        }
        console.log('Messages Seeded ✅');
      } else {
        console.warn('No message data found in CSV.');
      }
    } catch (error) {
      console.error('Error seeding messages ⛔', error);
    }
  }

  private async parseCsvFile(filePath: string): Promise<Message[]> {
    return new Promise((resolve, reject) => {
      const messagesData: Message[] = [];

      fs.createReadStream(filePath)
        .pipe(csv.parse({ headers: true }))
        .on('data', (data) => {
          const message = new Message();
          message.title = data.title;
          message.seen = data.seen;
          message.userId = data.user_id;

          messagesData.push(message);
        })
        .on('end', () => resolve(messagesData))
        .on('error', (error) => reject(error));
    });
  }
}
