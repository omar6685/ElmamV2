import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
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
      relations: ['user', 'message'], // Include related entities if needed
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
}
