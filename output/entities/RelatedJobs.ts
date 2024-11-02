import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ActivityTables } from "./ActivityTables";
import { CommercialRegistrationNumbers } from "./CommercialRegistrationNumbers";
import { Users } from "./Users";

@Index("index_related_jobs_on_activity_table_id", ["activityTableId"], {})
@Index(
  "index_related_jobs_on_commercial_registration_number_id",
  ["commercialRegistrationNumberId"],
  {}
)
@Index("related_jobs_pkey", ["id"], { unique: true })
@Index("index_related_jobs_on_user_id", ["userId"], {})
@Entity("related_jobs", { schema: "public" })
export class RelatedJobs {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("bigint", { name: "activity_table_id" })
  activityTableId: string;

  @Column("bigint", { name: "user_id" })
  userId: number;

  @Column("character varying", { name: "result", nullable: true })
  result: string | null;

  @Column("bigint", { name: "commercial_registration_number_id" })
  commercialRegistrationNumberId: string;

  @Column("timestamp without time zone", { name: "created_at" })
  createdAt: Date;

  @Column("timestamp without time zone", { name: "updated_at" })
  updatedAt: Date;

  @ManyToOne(
    () => ActivityTables,
    (activityTables) => activityTables.relatedJobs
  )
  @JoinColumn([{ name: "activity_table_id", referencedColumnName: "id" }])
  activityTable: ActivityTables;

  @ManyToOne(
    () => CommercialRegistrationNumbers,
    (commercialRegistrationNumbers) => commercialRegistrationNumbers.relatedJobs
  )
  @JoinColumn([
    { name: "commercial_registration_number_id", referencedColumnName: "id" },
  ])
  commercialRegistrationNumber: CommercialRegistrationNumbers;

  @ManyToOne(() => Users, (users) => users.relatedJobs)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
}
