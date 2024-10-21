import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";
import { Notifications } from "./Notifications";

@Index("archive_records_pkey", ["id"], { unique: true })
@Index("index_archive_records_on_user_id", ["userId"], {})
@Entity("archive_records", { schema: "public" })
export class ArchiveRecords {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("character varying", { name: "company_name", nullable: true })
  companyName: string | null;

  @Column("character varying", { name: "record_type", nullable: true })
  recordType: string | null;

  @Column("character varying", { name: "record_no", nullable: true })
  recordNo: string | null;

  @Column("character varying", { name: "address", nullable: true })
  address: string | null;

  @Column("date", { name: "date_of_issue", nullable: true })
  dateOfIssue: string | null;

  @Column("date", { name: "date_of_expire", nullable: true })
  dateOfExpire: string | null;

  @Column("text", { name: "note", nullable: true })
  note: string | null;

  @Column("bigint", { name: "user_id" })
  userId: string;

  @Column("timestamp without time zone", { name: "created_at" })
  createdAt: Date;

  @Column("timestamp without time zone", { name: "updated_at" })
  updatedAt: Date;

  @ManyToOne(() => Users, (users) => users.archiveRecords)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;

  @OneToMany(
    () => Notifications,
    (notifications) => notifications.archiveRecord
  )
  notifications: Notifications[];
}
