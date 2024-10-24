import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import { Role, UserRole } from 'src/auth/entities/role.entity';
import { User } from 'src/users/entities/user.entity';

export default class UsersRolesSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    await dataSource.query('TRUNCATE "users_roles" RESTART IDENTITY;');

    const usersRoleRepository = dataSource.getRepository(UserRole);
    const userRepository = dataSource.getRepository(User);
    const roleRepository = dataSource.getRepository(Role);

    // Fetch all users
    const users = await userRepository.find();

    if (users.length === 0) {
      throw new Error(
        'No users found. Make sure UsersSeeder has run successfully.',
      );
    }

    // Fetch all roles
    const roles = await roleRepository.find();

    if (roles.length === 0) {
      throw new Error(
        'No roles found. Make sure RolesSeeder has run successfully.',
      );
    }

    for (const user of users) {
      const randomRole = roles[Math.floor(Math.random() * roles.length)];

      const userRole = new UserRole();
      userRole.user_id = user.id;
      userRole.role_id = randomRole.id;

      await usersRoleRepository.save(userRole);
    }

    console.log('Users Roles Seeded ✅');
  }
}
