import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { Notification } from './notification.entity';
import { User } from 'src/users/entities/user.entity';

@Index('archive_records_pkey', ['id'], { unique: true })
@Index('index_archive_records_on_user_id', ['userId'], {})
@Entity('archive_records', { schema: 'public' })
export class ArchiveRecord {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('character varying', { name: 'company_name', nullable: true })
  companyName: string | null;

  @Column('character varying', { name: 'record_type', nullable: true })
  recordType: string | null;

  @Column('character varying', { name: 'record_no', nullable: true })
  recordNo: string | null;

  @Column('character varying', { name: 'address', nullable: true })
  address: string | null;

  @Column('date', { name: 'date_of_issue', nullable: true })
  dateOfIssue: string | null;

  @Column('date', { name: 'date_of_expire', nullable: true })
  dateOfExpire: string | null;

  @Column('text', { name: 'note', nullable: true })
  note: string | null;

  @Column('bigint', { name: 'user_id' })
  userId: number;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Timestamp;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Timestamp;

  @ManyToOne(() => User, (users) => users.archiveRecords)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;

  @OneToMany(
    () => Notification,
    (notifications) => notifications.archiveRecord,
  )
  notifications: Notification[];
}
