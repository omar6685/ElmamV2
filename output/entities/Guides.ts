import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";

@Index("guides_pkey", ["id"], { unique: true })
@Index("index_guides_on_user_id", ["userId"], {})
@Entity("guides", { schema: "public" })
export class Guides {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("character varying", { name: "file", nullable: true })
  file: string | null;

  @Column("bigint", { name: "user_id" })
  userId: string;

  @Column("timestamp without time zone", { name: "created_at" })
  createdAt: Date;

  @Column("timestamp without time zone", { name: "updated_at" })
  updatedAt: Date;

  @ManyToOne(() => Users, (users) => users.guides)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
}
