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
  "index_nationality_reports_on_commercial_registration_number_id",
  ["commercialRegistrationNumberId"],
  {}
)
@Index("nationality_reports_pkey", ["id"], { unique: true })
@Index("index_nationality_reports_on_user_id", ["userId"], {})
@Entity("nationality_reports", { schema: "public" })
export class NationalityReports {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("character varying", { name: "result", nullable: true })
  result: string | null; // number of each nationality with their percentage separated by commas

  @Column("double precision", { name: "saudis", nullable: true, precision: 53 })
  saudis: number | null;

  @Column("double precision", {
    name: "total_employees",
    nullable: true,
    precision: 53,
  })
  totalEmployees: number | null;

  @Column("character varying", { name: "max_addition", nullable: true })
  maxAddition: string | null; // how many you can add to each nationality

  @Column("character varying", { name: "name", nullable: true })
  name: string | null;

  @Column("bigint", { name: "user_id" })
  userId: number;

  @Column("timestamp without time zone", { name: "created_at" })
  createdAt: Date;

  @Column("timestamp without time zone", { name: "updated_at" })
  updatedAt: Date;

  @Column("bigint", {
    name: "commercial_registration_number_id",
    default: () => "1",
  })
  commercialRegistrationNumberId: string;

  @ManyToOne(
    () => CommercialRegistrationNumbers,
    (commercialRegistrationNumbers) =>
      commercialRegistrationNumbers.nationalityReports
  )
  @JoinColumn([
    { name: "commercial_registration_number_id", referencedColumnName: "id" },
  ])
  commercialRegistrationNumber: CommercialRegistrationNumbers;

  @ManyToOne(() => Users, (users) => users.nationalityReports)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
}
