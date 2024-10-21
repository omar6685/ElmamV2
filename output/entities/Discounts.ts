import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";

@Index("discounts_pkey", ["id"], { unique: true })
@Index("index_discounts_on_user_id", ["userId"], {})
@Entity("discounts", { schema: "public" })
export class Discounts {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("character varying", { name: "code", nullable: true })
  code: string | null;

  @Column("integer", { name: "percentage", nullable: true })
  percentage: number | null;

  @Column("integer", { name: "used_count", nullable: true, default: () => "0" })
  usedCount: number | null;

  @Column("boolean", { name: "active", nullable: true })
  active: boolean | null;

  @Column("bigint", { name: "user_id" })
  userId: string;

  @Column("timestamp without time zone", { name: "created_at" })
  createdAt: Date;

  @Column("timestamp without time zone", { name: "updated_at" })
  updatedAt: Date;

  @ManyToOne(() => Users, (users) => users.discounts)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
}
