import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CommercialRegistrationNumbers } from "./CommercialRegistrationNumbers";
import { Users } from "./Users";

@Index(
  "index_activity_reports_on_commercial_registration_number_id",
  ["commercialRegistrationNumberId"],
  {}
)
@Index("activity_reports_pkey", ["id"], { unique: true })
@Index("index_activity_reports_on_user_id", ["userId"], {})
@Entity("activity_reports", { schema: "public" })
export class ActivityReports {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("character varying", { name: "result", nullable: true })
  result: string | null;

  @Column("character varying", { name: "high", nullable: true })
  high: string | null;

  @Column("character varying", { name: "low", nullable: true })
  low: string | null;

  @Column("bigint", { name: "commercial_registration_number_id" })
  commercialRegistrationNumberId: string;

  @Column("bigint", { name: "user_id" })
  userId: number;

  @Column("timestamp without time zone", { name: "created_at" })
  createdAt: Date;

  @Column("timestamp without time zone", { name: "updated_at" })
  updatedAt: Date;

  @ManyToOne(
    () => CommercialRegistrationNumbers,
    (commercialRegistrationNumbers) =>
      commercialRegistrationNumbers.activityReports
  )
  @JoinColumn([
    { name: "commercial_registration_number_id", referencedColumnName: "id" },
  ])
  commercialRegistrationNumber: CommercialRegistrationNumbers;

  @ManyToOne(() => Users, (users) => users.activityReports)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
}
