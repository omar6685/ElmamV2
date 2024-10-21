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
  "index_mihans_on_commercial_registration_number_id",
  ["commercialRegistrationNumberId"],
  {}
)
@Index("mihans_pkey", ["id"], { unique: true })
@Index("index_mihans_on_user_id", ["userId"], {})
@Entity("mihans", { schema: "public" })
export class Mihans {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("character varying", {
    name: "foreigners_in_excel_not_in_csv",
    nullable: true,
  })
  foreignersInExcelNotInCsv: string | null;

  @Column("character varying", {
    name: "foreigners_without_residence",
    nullable: true,
  })
  foreignersWithoutResidence: string | null;

  @Column("character varying", { name: "saudis_only_in_csv", nullable: true })
  saudisOnlyInCsv: string | null;

  @Column("character varying", {
    name: "saudis_in_excel_not_in_csv",
    nullable: true,
  })
  saudisInExcelNotInCsv: string | null;

  @Column("character varying", {
    name: "saudis_in_both_files_half",
    nullable: true,
  })
  saudisInBothFilesHalf: string | null;

  @Column("character varying", {
    name: "saudis_in_both_files_zero",
    nullable: true,
  })
  saudisInBothFilesZero: string | null;

  @Column("character varying", {
    name: "foreigners_in_csv_not_in_excel",
    nullable: true,
  })
  foreignersInCsvNotInExcel: string | null;

  @Column("character varying", { name: "company_name", nullable: true })
  companyName: string | null;

  @Column("timestamp without time zone", { name: "created_at" })
  createdAt: Date;

  @Column("timestamp without time zone", { name: "updated_at" })
  updatedAt: Date;

  @Column("bigint", { name: "user_id", nullable: true })
  userId: string | null;

  @Column("bigint", {
    name: "commercial_registration_number_id",
    default: () => "1",
  })
  commercialRegistrationNumberId: string;

  @ManyToOne(
    () => CommercialRegistrationNumbers,
    (commercialRegistrationNumbers) => commercialRegistrationNumbers.mihans
  )
  @JoinColumn([
    { name: "commercial_registration_number_id", referencedColumnName: "id" },
  ])
  commercialRegistrationNumber: CommercialRegistrationNumbers;

  @ManyToOne(() => Users, (users) => users.mihans)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
}
