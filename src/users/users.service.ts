import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Role, UserRole } from 'src/auth/entities/role.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(UserRole)
    private readonly usersRolesRepository: Repository<UserRole>,

    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  // Get roles for a specific user (by user_id)
  async getUserRoles(userId: number): Promise<Role[]> {
    // Step 1: Fetch role IDs from users_roles table for this user
    this.logger.log('User id:', userId);
    const userRoles = await this.usersRolesRepository
      .find({
        where: { userId: userId },
      })
      .then((data) => data)
      .catch((err) => {
        this.logger.log('Error in user roles:', err);
        return [];
      });

    // Step 2: Fetch role details from roles table using role IDs
    const roleIds = userRoles.map((ur: UserRole) => ur.roleId);

    if (roleIds.length > 0) {
      return this.rolesRepository.findBy({ id: In(roleIds) }); // Fetch roles
    }

    return [];
  }

  // Assign a role to a user (create entry in users_roles table)
  async assignRole(userId: number, roleName: string): Promise<void> {
    // check if role does not exists and create it
    const roleExists = await this.rolesRepository.findOne({
      where: { name: roleName },
    });

    if (!roleExists) {
      const newRole = this.rolesRepository.create({ name: roleName });
      await this.rolesRepository.save(newRole);
    }
    // Find the role by name
    const role = await this.rolesRepository.findOne({
      where: { name: roleName },
    });
    this.logger.log(`Role ${role.id} found`);
    if (!role) {
      throw new Error('Role not found');
    }

    // Insert into users_roles table
    const userRole = this.usersRolesRepository.create({
      userId: userId,
      roleId: role.id,
    });
    await this.usersRolesRepository.save(userRole);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async create(createUserDto: Partial<User>): Promise<User> {
    try {
      const newUser = this.usersRepository.create(createUserDto);
      await this.usersRepository.save(newUser);
      return newUser;
    } catch (err) {
      throw new Error('Error creating user');
    }
  }

  async update(userId: number, updateData: Partial<User>): Promise<void> {
    await this.usersRepository.update(userId, updateData);
  }

  async remove(userId: number): Promise<void> {
    await this.usersRepository.delete(userId);
  }
}
