import { Message } from 'src/messages/entities/message.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
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
  userId: string;

  @Column('bigint', { name: 'message_id', nullable: true })
  messageId: string | null;

  @Column('character varying', { name: 'title', nullable: true })
  title: string | null;

  @Column('boolean', { name: 'seen', nullable: true })
  seen: boolean | null;

  @Column('timestamp without time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp without time zone', { name: 'updated_at' })
  updatedAt: Date;

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
  notification_token: NotificationToken;
}
