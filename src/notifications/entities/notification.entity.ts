import { Message } from 'src/messages/entities/message.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { ArchiveRecord } from './archived-record.entity';
import { NotificationToken } from './notification-token.entity';

@Index('index_notifications_on_archive_record_id', ['archiveRecordId'], {})
@Index('notifications_pkey', ['id'], { unique: true })
@Index('index_notifications_on_message_id', ['messageId'], {})
@Index('index_notifications_on_user_id', ['userId'], {})
@Entity('notifications', { schema: 'public' })
export class Notification {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column('bigint', { name: 'user_id' })
  userId: number;

  @Column('bigint', { name: 'message_id', nullable: true })
  messageId: number | null;

  @Column('character varying', { name: 'title', nullable: true })
  title: string | null;

  @Column('boolean', { name: 'seen', nullable: true })
  seen: boolean | null;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Timestamp;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Timestamp;

  @Column('text', { name: 'content', nullable: true })
  content: string | null;

  @Column('bigint', { name: 'archive_record_id', nullable: true })
  archiveRecordId: string | null;

  @ManyToOne(
    () => ArchiveRecord,
    (archiveRecords) => archiveRecords.notifications,
  )
  @JoinColumn([{ name: 'archive_record_id', referencedColumnName: 'id' }])
  archiveRecord: ArchiveRecord;

  @ManyToOne(() => Message, (messages) => messages.notifications)
  @JoinColumn([{ name: 'message_id', referencedColumnName: 'id' }])
  message: Message;

  @ManyToOne(() => User, (users) => users.notifications)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;

  @ManyToOne(
    () => NotificationToken,
    (notificationToken) => notificationToken.notifications,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'notification_token_id' })
  notificationToken: NotificationToken;
}
