import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import { Role } from 'src/auth/entities/role.entity';
import { RolesEnum } from 'src/shared/enums/role.enum';

export default class RolesSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    await dataSource.query('TRUNCATE "roles" RESTART IDENTITY;');

    const repository = dataSource.getRepository(Role);
    await repository.insert({
      name: RolesEnum.ADMIN,
    });
    await repository.insert({
      name: RolesEnum.CUSTOMER,
    });
    await repository.insert({
      name: RolesEnum.TECHNICAL,
    });

    console.log('Roles Seeded ✅');
  }
}
