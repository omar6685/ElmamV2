import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

import { User } from 'src/users/entities/user.entity';
import { Notification } from './notification.entity';

@Entity({ name: 'notification_tokens' })
export class NotificationToken {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.notificationTokens, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'varchar', name: 'device_type', length: 50, default: 'web' })
  deviceType: string;

  @Column({ type: 'varchar', name: 'notification_token' })
  notificationToken: string;

  @Column({ type: 'varchar', length: 10, default: 'ACTIVE' })
  status: string;

  // One-to-Many relation with Notification (A token can have many notifications)
  @OneToMany(
    () => Notification,
    (notification) => notification.notificationToken,
  )
  notifications: Notification[];
}
