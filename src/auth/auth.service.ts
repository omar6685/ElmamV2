import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Role } from './entities/role.entity';
import { RolesEnum } from 'src/shared/enums/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Sign in method
  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Compare hashed password with provided password
    const isPasswordValid = await bcrypt.compare(
      password,
      user.encrypted_password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Fetch user roles
    const roles: Role[] = await this.usersService.getUserRoles(user.id);
    const roleNames = roles.map((role) => role.name); // Extract role names

    const payload = {
      sub: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone,
      email: user.email,
      roles: roleNames,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(
    first_name: string,
    last_name: string,
    phone: string,
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    // Check if user already exists
    const existingUser = await this.usersService.findOne(email);
    if (existingUser) {
      throw new UnauthorizedException('Email already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // Adjust salt rounds as needed

    // Create a new user with hashed password
    const newUser = await this.usersService.create({
      first_name,
      last_name,
      phone,
      email,
      encrypted_password: hashedPassword,
    });

    // Assign default role 'customer' to the new user (create entry in users_roles)
    await this.usersService.assignRole(newUser.id, RolesEnum.CUSTOMER);

    const payload = {
      sub: newUser.id,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      phone: newUser.phone,
      email: newUser.email,
      roles: [RolesEnum.CUSTOMER],
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
