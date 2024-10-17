import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';

import { Message } from '../../messages/entities/message.entity';
import { NotificationToken } from './notification-token.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'boolean', default: false })
  seen: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  // Many-to-One relation with User (A user can have many notifications)
  @ManyToOne(() => User, (user) => user.notifications, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  // Many-to-One relation with Message (A message can have many notifications)
  @ManyToOne(() => Message, (message) => message.notifications, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'message_id' })
  message: Message;

  // Many-to-One relation with NotificationToken (A token can have many notifications)
  @ManyToOne(() => NotificationToken, (notificationToken) => notificationToken.notifications, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'notification_token_id' })
  notification_token: NotificationToken;
}
