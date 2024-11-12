import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { RolesEnum } from 'src/shared/enums/role.enum';
import { UsersService } from '../users/users.service';
import { Role } from './entities/role.entity';
import { NotificationToken } from 'src/notifications/entities/notification-token.entity';
import { User } from 'src/users/entities/user.entity';
import { Request } from 'express';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(NotificationToken)
    private notificationTokenRepository: Repository<NotificationToken>, // Inject repository for NotificationToken
  ) {}

  // Sign in method
  async signIn(
    email: string,
    password: string,
    fcmToken: string,
    request: Request,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    this.logger.log('Login User:', user);

    // Compare hashed password with provided password
    const isPasswordValid = await bcrypt.compare(
      password,
      user.encryptedPassword,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    this.logger.log('Password Match ✔');

    // Fetch user roles
    const roles: Role[] = await this.usersService.getUserRoles(user.id);
    const roleNames = roles.map((role) => role.name); // Extract role names

    this.logger.log(`Role names: ${roleNames}`);

    // Get current timestamp and IP address
    const currentTimestamp = new Date();
    const currentIp = request.ip;

    this.logger.log('Sign in time/dates:', {
      signInCount: user.signInCount + 1,
      last_sign_in_at: user.currentSignInAt,
      currentSignInAt: currentTimestamp,
      last_sign_in_ip: user.currentSignInIp,
      currentSignInIp: currentIp,
    });

    // Update user's sign-in data
    await this.usersService.update(user.id, {
      signInCount: user.signInCount + 1,
      lastSignInAt: user.currentSignInAt,
      currentSignInAt: currentTimestamp,
      lastSignInIp: user.currentSignInIp,
      currentSignInIp: currentIp,
    });

    // Create or update the fcmToken for this user
    await this.handleFcmToken(user, fcmToken);

    const payload = {
      sub: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email,
      roles: roleNames,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    password: string,
    fcmToken: string,
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
      firstName,
      lastName,
      phone,
      email,
      encryptedPassword: hashedPassword,
    });

    this.logger.log('New User Added Successfully');

    // Assign default role 'customer' to the new user (create entry in users_roles)
    try {
      await this.usersService.assignRole(newUser.id, RolesEnum.CUSTOMER);
      this.logger.log('Role assigned to user:', RolesEnum.CUSTOMER);
    } catch (err) {
      //! Delete the user
      await this.usersService.remove(newUser.id);
      this.logger.error('Error assigning role to user:', err);
      throw new Error('Unable to assign role to user');
    }

    // Create or update the fcmToken for this user
    await this.handleFcmToken(newUser, fcmToken);

    this.logger.log('FCM Token added/updated');

    const payload = {
      sub: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      phone: newUser.phone,
      email: newUser.email,
      roles: [RolesEnum.CUSTOMER],
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  // Helper function to handle FCM token creation or update
  private async handleFcmToken(user: User, fcmToken: string) {
    const existingToken = await this.notificationTokenRepository.findOne({
      where: { user: { id: user.id } },
    });

    if (existingToken) {
      // If the token is different, update it
      if (existingToken.notificationToken !== fcmToken) {
        existingToken.notificationToken = fcmToken;
        await this.notificationTokenRepository.save(existingToken);
      }
    } else {
      // If the token doesn't exist, create a new record
      const newToken = this.notificationTokenRepository.create({
        user,
        notificationToken: fcmToken,
      });
      await this.notificationTokenRepository.save(newToken);
    }
  }
}
