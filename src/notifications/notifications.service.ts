import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as firebase from 'firebase-admin';
import * as path from 'path';

import { Notification } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationToken } from './entities/notification-token.entity';

firebase.initializeApp({
  credential: firebase.credential.cert(path.join('firebase-adminsdk.json')),
});

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    @InjectRepository(NotificationToken)
    private readonly notificationTokenRepository: Repository<NotificationToken>,
  ) {}

  // Create a new notification
  async create(
    createNotificationDto: CreateNotificationDto,
  ): Promise<Notification> {
    const newNotification = this.notificationRepository.create(
      createNotificationDto,
    );
    return await this.notificationRepository.save(newNotification);
  }

  // Find all notifications
  async findAll(): Promise<Notification[]> {
    return await this.notificationRepository.find({
      relations: ['user', 'message', 'notification_tokens'], // Include related entities if needed
    });
  }

  // Find a single notification by ID
  async findOne(id: number): Promise<Notification> {
    const notification = await this.notificationRepository.findOne({
      where: { id },
      relations: ['user', 'message'], // Include related entities if needed
    });

    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }

    return notification;
  }

  // Update an existing notification
  async update(
    id: number,
    updateNotificationDto: UpdateNotificationDto,
  ): Promise<Notification> {
    const notification = await this.findOne(id); // Find the notification, throw error if not found

    Object.assign(notification, updateNotificationDto); // Merge new data with the existing notification
    return await this.notificationRepository.save(notification);
  }

  // Remove a notification by ID
  async remove(id: number): Promise<void> {
    const notification = await this.findOne(id); // Find the notification, throw error if not found
    await this.notificationRepository.remove(notification);
  }

  async send(
    userId: number,
    title: string,
    body: string,
  ): Promise<{ message: string }> {
    try {
      const notification = await this.notificationTokenRepository.findOne({
        where: { user: { id: userId }, status: 'ACTIVE' },
      });
      this.logger.log('Request data:', userId, title, body);
      this.logger.log('notification:', notification);
      if (notification) {
        this.logger.log('Notification exists');
        await firebase.messaging().send({
          notification: { title, body },
          token: notification.notificationToken,
        });
        await this.notificationRepository.save({
          notification_token: notification,
          title,
          body,
          status: 'ACTIVE',
          created_by: userId,
        });
        return { message: 'Notification sent successfully' };
      } else {
        throw new Error('User does not have a valid notification token');
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
