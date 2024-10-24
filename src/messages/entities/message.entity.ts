import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Timestamp,
} from 'typeorm';

import { Notification } from '../../notifications/entities/notification.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'boolean', default: false })
  seen: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Timestamp;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  // Many-to-One relation with User (A user can have many messages)
  @ManyToOne(() => User, (user) => user.messages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  // One-to-Many relation with Notification (A message can have many notifications)
  @OneToMany(() => Notification, (notification) => notification.message)
  notifications: Notification[];
}
