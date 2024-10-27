import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource, Repository } from 'typeorm';
import * as fs from 'fs';
import * as csv from 'fast-csv';

import { User } from 'src/users/entities/user.entity';

export default class UsersSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    console.log('Users seeding in progress... ⏳');

    const userRepository: Repository<User> = dataSource.getRepository(User);
    const filePath =
      '/home/zineddine-bk/Desktop/Elmam/elmam-backend/db/data/users.csv';

    try {
      const usersData: User[] = await this.parseCsvFile(filePath);

      if (usersData.length > 0) {
        for (const user of usersData) {
          // Check for existing user with the same email, unlockToken, or resetPasswordToken
          const existingUser = await userRepository.findOne({
            where: [
              { email: user.email },
              { unlockToken: user.unlockToken },
              { resetPasswordToken: user.resetPasswordToken },
            ],
          });

          // Only insert if no user found with matching unique fields
          if (!existingUser) {
            await userRepository.save(user);
          } else {
            console.warn(`Duplicate user skipped: ${user.email}`);
          }
        }
        console.log('Users Seeded ✅');
      } else {
        console.warn('No user data found in CSV.');
      }
    } catch (error) {
      console.error('Error seeding users ⛔', error);
    }
  }

  private async parseCsvFile(filePath: string): Promise<User[]> {
    return new Promise((resolve, reject) => {
      const usersData: User[] = [];

      fs.createReadStream(filePath)
        .pipe(csv.parse({ headers: true }))
        .on('data', (data) => {
          const user = new User();
          user.firstName = data.first_name;
          user.lastName = data.last_name;
          user.email = data.email;
          user.phone = data.phone;
          user.encryptedPassword = data.encrypted_password;

          if (data.birthdate !== 'NULL')
            user.birthdate = new Date(data.birthdate);
          if (data.reset_password_token !== 'NULL')
            user.resetPasswordToken = data.reset_password_token;
          if (data.reset_password_sent_at !== 'NULL')
            user.resetPasswordSentAt = new Date(data.reset_password_sent_at);
          if (data.confirmation_token !== 'NULL')
            user.confirmationToken = data.confirmation_token;
          if (data.city !== 'NULL') user.city = data.city;
          if (data.sex !== 'NULL') user.sex = data.sex === 'true'; // Convert to boolean if necessary
          if (data.work_in_company !== 'NULL')
            user.workInCompany = data.work_in_company === 'true';
          if (data.sign_in_count !== 'NULL')
            user.signInCount = parseInt(data.sign_in_count, 10);

          usersData.push(user);
        })
        .on('end', () => resolve(usersData))
        .on('error', (error) => reject(error));
    });
  }
}
