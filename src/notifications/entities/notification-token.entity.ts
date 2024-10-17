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

  @Column({ type: 'varchar', length: 50, default: 'web' })
  device_type: string;

  @Column({ type: 'varchar' })
  notification_token: string;

  @Column({ type: 'varchar', length: 10, default: 'ACTIVE' })
  status: string;

  // One-to-Many relation with Notification (A token can have many notifications)
  @OneToMany(
    () => Notification,
    (notification) => notification.notification_token,
  )
  notifications: Notification[];
}
