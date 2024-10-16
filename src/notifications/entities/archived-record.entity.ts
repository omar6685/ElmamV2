import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Notification } from './notification.entity';

@Entity('archive_records')
@Index('index_archive_records_on_user_id', ['user_id']) // Index on user_id
export class ArchiveRecord {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'varchar' })
  company_name: string;

  @Column({ type: 'varchar' })
  record_type: string;

  @Column({ type: 'varchar' })
  record_no: string;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'date' })
  date_of_issue: Date;

  @Column({ type: 'date' })
  date_of_expire: Date;

  @Column({ type: 'text', nullable: true })
  note: string;

  @Column({ type: 'bigint' })
  user_id: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
