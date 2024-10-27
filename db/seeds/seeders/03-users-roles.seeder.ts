import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource, Repository } from 'typeorm';
import * as fs from 'fs';
import * as csv from 'fast-csv';

import { Role, UserRole } from 'src/auth/entities/role.entity';
import { User } from 'src/users/entities/user.entity';

export default class UsersRolesSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    console.log('Users roles seeding in progress... ⏳');

    await dataSource.query('TRUNCATE "users_roles" RESTART IDENTITY;');

    const usersRoleRepository = dataSource.getRepository(UserRole);
    const userRepository = dataSource.getRepository(User);
    const roleRepository = dataSource.getRepository(Role);
    const filePath =
      '/home/zineddine-bk/Desktop/Elmam/elmam-backend/db/data/users_roles.csv';

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

    try {
      const usersRolesData: UserRole[] = await this.parseCsvFile(
        filePath,
        userRepository,
        roleRepository,
      );

      if (usersRolesData.length > 0) {
        for (const userRole of usersRolesData) {
          // Check for existing user with the same email, unlockToken, or resetPasswordToken
          const existingUserRole = await usersRoleRepository.findOne({
            where: [{ userId: userRole.userId, roleId: userRole.roleId }],
          });

          // Only insert if no user found with matching unique fields
          if (!existingUserRole) {
            await usersRoleRepository.save(userRole);
          } else {
            console.warn(
              `Duplicate user role skipped: (user_id: ${userRole.userId}, role_id: ${userRole.roleId})`,
            );
          }
        }
        console.log('Users Seeded ✅');
      } else {
        console.warn('No user data found in CSV.');
      }
    } catch (error) {
      console.error('Error seeding users roles ⛔', error);
    }
  }

  private async parseCsvFile(
    filePath: string,
    userRepository: Repository<User>,
    roleRepository: Repository<Role>,
  ): Promise<UserRole[]> {
    return new Promise((resolve, reject) => {
      const usersRolesData: UserRole[] = [];

      fs.createReadStream(filePath)
        .pipe(csv.parse({ headers: true }))
        .on('data', (data) => {
          const userRole = new UserRole();
          // check if user and role exist
          const user = userRepository.findOne({
            where: { id: parseInt(data.user_id) },
          });
          const role = roleRepository.findOne({
            where: { id: parseInt(data.role_id) },
          });

          if (!user || !role) {
            console.warn(`User or role not found for user_id: ${data.user_id}`);
            return;
          }
          userRole.userId = data.user_id;
          userRole.roleId = data.role_id;

          usersRolesData.push(userRole);
        })
        .on('end', () => resolve(usersRolesData))
        .on('error', (error) => reject(error));
    });
  }
}
