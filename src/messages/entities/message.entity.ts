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
  Index,
} from 'typeorm';

import { Notification } from '../../notifications/entities/notification.entity';
import { User } from 'src/users/entities/user.entity';

@Index("messages_pkey", ["id"], { unique: true })
@Index("index_messages_on_user_id", ["userId"], {})
@Entity("messages", { schema: "public" })
export class Message {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: number;

  @Column("character varying", { name: "title", nullable: true })
  title: string | null;

  @Column("boolean", { name: "seen", nullable: true, default: () => "false" })
  seen: boolean | null;

  @Column("bigint", { name: "user_id" })
  userId: number;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Timestamp;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Timestamp;


  @ManyToOne(() => User, (users) => users.messages)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;

  @OneToMany(() => Notification, (notifications) => notifications.message)
  notifications: Notification[];
}
