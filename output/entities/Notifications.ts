import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ArchiveRecords } from "./ArchiveRecords";
import { Messages } from "./Messages";
import { Users } from "./Users";

@Index("index_notifications_on_archive_record_id", ["archiveRecordId"], {})
@Index("notifications_pkey", ["id"], { unique: true })
@Index("index_notifications_on_message_id", ["messageId"], {})
@Index("index_notifications_on_user_id", ["userId"], {})
@Entity("notifications", { schema: "public" })
export class Notifications {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("bigint", { name: "user_id" })
  userId: string;

  @Column("bigint", { name: "message_id", nullable: true })
  messageId: string | null;

  @Column("character varying", { name: "title", nullable: true })
  title: string | null;

  @Column("boolean", { name: "seen", nullable: true })
  seen: boolean | null;

  @Column("timestamp without time zone", { name: "created_at" })
  createdAt: Date;

  @Column("timestamp without time zone", { name: "updated_at" })
  updatedAt: Date;

  @Column("text", { name: "content", nullable: true })
  content: string | null;

  @Column("bigint", { name: "archive_record_id", nullable: true })
  archiveRecordId: string | null;

  @ManyToOne(
    () => ArchiveRecords,
    (archiveRecords) => archiveRecords.notifications
  )
  @JoinColumn([{ name: "archive_record_id", referencedColumnName: "id" }])
  archiveRecord: ArchiveRecords;

  @ManyToOne(() => Messages, (messages) => messages.notifications)
  @JoinColumn([{ name: "message_id", referencedColumnName: "id" }])
  message: Messages;

  @ManyToOne(() => Users, (users) => users.notifications)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
}
