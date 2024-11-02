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

@Index("messages_pkey", ["id"], { unique: true })
@Index("index_messages_on_user_id", ["userId"], {})
@Entity("messages", { schema: "public" })
export class Messages {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("character varying", { name: "title", nullable: true })
  title: string | null;

  @Column("boolean", { name: "seen", nullable: true, default: () => "false" })
  seen: boolean | null;

  @Column("bigint", { name: "user_id" })
  userId: number;

  @Column("timestamp without time zone", { name: "created_at" })
  createdAt: Date;

  @Column("timestamp without time zone", { name: "updated_at" })
  updatedAt: Date;

  @ManyToOne(() => Users, (users) => users.messages)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;

  @OneToMany(() => Notifications, (notifications) => notifications.message)
  notifications: Notifications[];
}
