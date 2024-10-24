import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import { User } from 'src/users/entities/user.entity';

export default class UsersSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    // Truncate the "users" table and all its related data, and re-generate identity.
    await dataSource.query('TRUNCATE "users" RESTART IDENTITY CASCADE;');

    const userFactory = factoryManager.get(User);

    // save 10 factory generated entities, to the database
    await userFactory.saveMany(10);

    console.log('Users Seeded ✅');
  }
}
