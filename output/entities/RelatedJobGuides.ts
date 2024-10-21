import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ActivityTables } from "./ActivityTables";
import { Users } from "./Users";

@Index("index_related_job_guides_on_activity_table_id", ["activityTableId"], {})
@Index("related_job_guides_pkey", ["id"], { unique: true })
@Index("index_related_job_guides_on_user_id", ["userId"], {})
@Entity("related_job_guides", { schema: "public" })
export class RelatedJobGuides {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("bigint", { name: "activity_table_id" })
  activityTableId: string;

  @Column("bigint", { name: "user_id" })
  userId: string;

  @Column("character varying", { name: "file", nullable: true })
  file: string | null;

  @Column("timestamp without time zone", { name: "created_at" })
  createdAt: Date;

  @Column("timestamp without time zone", { name: "updated_at" })
  updatedAt: Date;

  @ManyToOne(
    () => ActivityTables,
    (activityTables) => activityTables.relatedJobGuides
  )
  @JoinColumn([{ name: "activity_table_id", referencedColumnName: "id" }])
  activityTable: ActivityTables;

  @ManyToOne(() => Users, (users) => users.relatedJobGuides)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
}
