import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";

@Index("tickets_pkey", ["id"], { unique: true })
@Index("index_tickets_on_user_id", ["userId"], {})
@Entity("tickets", { schema: "public" })
export class Tickets {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("character varying", { name: "title", nullable: true })
  title: string | null;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("boolean", { name: "status", nullable: true })
  status: boolean | null;

  @Column("text", { name: "chat_history", nullable: true })
  chatHistory: string | null;

  @Column("bigint", { name: "user_id" })
  userId: number;

  @Column("timestamp without time zone", { name: "created_at" })
  createdAt: Date;

  @Column("timestamp without time zone", { name: "updated_at" })
  updatedAt: Date;

  @ManyToOne(() => Users, (users) => users.tickets)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
}
