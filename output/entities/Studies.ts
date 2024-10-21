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
import { CompanySizes } from "./CompanySizes";
import { Users } from "./Users";

@Index("index_studies_on_activity_table_id", ["activityTableId"], {})
@Index(
  "index_studies_on_commercial_registration_number_id",
  ["commercialRegistrationNumberId"],
  {}
)
@Index("index_studies_on_company_size_id", ["companySizeId"], {})
@Index("studies_pkey", ["id"], { unique: true })
@Index("index_studies_on_user_id", ["userId"], {})
@Entity("studies", { schema: "public" })
export class Studies {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("bigint", { name: "activity_table_id" })
  activityTableId: string;

  @Column("bigint", { name: "company_size_id" })
  companySizeId: string;

  @Column("character varying", { name: "branch", nullable: true })
  branch: string | null;

  @Column("double precision", {
    name: "foreigner",
    nullable: true,
    precision: 53,
  })
  foreigner: number | null;

  @Column("double precision", { name: "saudi", nullable: true, precision: 53 })
  saudi: number | null;

  @Column("integer", { name: "ajier", nullable: true })
  ajier: number | null;

  @Column("double precision", {
    name: "real_foreigner",
    nullable: true,
    precision: 53,
  })
  realForeigner: number | null;

  @Column("double precision", {
    name: "real_saudi",
    nullable: true,
    precision: 53,
  })
  realSaudi: number | null;

  @Column("integer", { name: "saudi_four", nullable: true })
  saudiFour: number | null;

  @Column("integer", { name: "saudi_three_four", nullable: true })
  saudiThreeFour: number | null;

  @Column("integer", { name: "saudi_three", nullable: true })
  saudiThree: number | null;

  @Column("integer", { name: "visa", nullable: true })
  visa: number | null;

  @Column("integer", { name: "saudi_disable", nullable: true })
  saudiDisable: number | null;

  @Column("boolean", { name: "adaptation", nullable: true })
  adaptation: boolean | null;

  @Column("integer", { name: "saudi_jailed", nullable: true })
  saudiJailed: number | null;

  @Column("integer", { name: "saudi_student", nullable: true })
  saudiStudent: number | null;

  @Column("integer", { name: "saudi_online", nullable: true })
  saudiOnline: number | null;

  @Column("integer", { name: "saudi_player", nullable: true })
  saudiPlayer: number | null;

  @Column("integer", { name: "saudi_loan_player", nullable: true })
  saudiLoanPlayer: number | null;

  @Column("integer", { name: "foreigner_like_saudi", nullable: true })
  foreignerLikeSaudi: number | null;

  @Column("integer", { name: "foreigner_like_foreigner", nullable: true })
  foreignerLikeForeigner: number | null;

  @Column("integer", { name: "specialy_foreigner", nullable: true })
  specialyForeigner: number | null;

  @Column("integer", { name: "tribe_saudi", nullable: true })
  tribeSaudi: number | null;

  @Column("integer", { name: "gulf_citizen", nullable: true })
  gulfCitizen: number | null;

  @Column("integer", { name: "owner", nullable: true })
  owner: number | null;

  @Column("integer", { name: "red_week", nullable: true })
  redWeek: number | null;

  @Column("integer", { name: "uncounted_saudi", nullable: true })
  uncountedSaudi: number | null;

  @Column("timestamp without time zone", { name: "created_at" })
  createdAt: Date;

  @Column("timestamp without time zone", { name: "updated_at" })
  updatedAt: Date;

  @Column("bigint", { name: "user_id", nullable: true })
  userId: string | null;

  @Column("bigint", {
    name: "commercial_registration_number_id",
    nullable: true,
  })
  commercialRegistrationNumberId: string | null;

  @Column("double precision", {
    name: "saudi_addition_count_to_low",
    nullable: true,
    precision: 53,
  })
  saudiAdditionCountToLow: number | null;

  @Column("double precision", {
    name: "saudi_addition_count_to_mid",
    nullable: true,
    precision: 53,
  })
  saudiAdditionCountToMid: number | null;

  @Column("double precision", {
    name: "saudi_addition_count_to_hi",
    nullable: true,
    precision: 53,
  })
  saudiAdditionCountToHi: number | null;

  @Column("double precision", {
    name: "saudi_addition_count_to_platinium",
    nullable: true,
    precision: 53,
  })
  saudiAdditionCountToPlatinium: number | null;

  @Column("double precision", {
    name: "forigner_subtraction_count_to_low",
    nullable: true,
    precision: 53,
  })
  forignerSubtractionCountToLow: number | null;

  @Column("double precision", {
    name: "forigner_subtraction_count_to_mid",
    nullable: true,
    precision: 53,
  })
  forignerSubtractionCountToMid: number | null;

  @Column("double precision", {
    name: "forigner_subtraction_count_to_hi",
    nullable: true,
    precision: 53,
  })
  forignerSubtractionCountToHi: number | null;

  @Column("double precision", {
    name: "forigner_subtraction_count_to_platinium",
    nullable: true,
    precision: 53,
  })
  forignerSubtractionCountToPlatinium: number | null;

  @Column("double precision", {
    name: "saudizm",
    nullable: true,
    precision: 53,
  })
  saudizm: number | null;

  @Column("character varying", { name: "status", nullable: true })
  status: string | null;

  @Column("double precision", {
    name: "visas_count",
    nullable: true,
    precision: 53,
  })
  visasCount: number | null;

  @Column("double precision", {
    name: "foreigners_allowed",
    nullable: true,
    precision: 53,
  })
  foreignersAllowed: number | null;

  @Column("double precision", {
    name: "saudis_not_needed",
    nullable: true,
    precision: 53,
  })
  saudisNotNeeded: number | null;

  @Column("double precision", {
    name: "visas_count_low",
    nullable: true,
    precision: 53,
  })
  visasCountLow: number | null;

  @Column("double precision", {
    name: "visas_count_mid",
    nullable: true,
    precision: 53,
  })
  visasCountMid: number | null;

  @Column("double precision", {
    name: "visas_count_hi",
    nullable: true,
    precision: 53,
  })
  visasCountHi: number | null;

  @Column("double precision", {
    name: "visas_count_platinium",
    nullable: true,
    precision: 53,
  })
  visasCountPlatinium: number | null;

  @Column("double precision", {
    name: "saudis_needed_low",
    nullable: true,
    precision: 53,
  })
  saudisNeededLow: number | null;

  @Column("double precision", {
    name: "saudis_needed_mid",
    nullable: true,
    precision: 53,
  })
  saudisNeededMid: number | null;

  @Column("double precision", {
    name: "saudis_needed_hi",
    nullable: true,
    precision: 53,
  })
  saudisNeededHi: number | null;

  @Column("double precision", {
    name: "saudis_needed_platinium",
    nullable: true,
    precision: 53,
  })
  saudisNeededPlatinium: number | null;

  @ManyToOne(() => ActivityTables, (activityTables) => activityTables.studies)
  @JoinColumn([{ name: "activity_table_id", referencedColumnName: "id" }])
  activityTable: ActivityTables;

  @ManyToOne(
    () => CommercialRegistrationNumbers,
    (commercialRegistrationNumbers) => commercialRegistrationNumbers.studies
  )
  @JoinColumn([
    { name: "commercial_registration_number_id", referencedColumnName: "id" },
  ])
  commercialRegistrationNumber: CommercialRegistrationNumbers;

  @ManyToOne(() => CompanySizes, (companySizes) => companySizes.studies)
  @JoinColumn([{ name: "company_size_id", referencedColumnName: "id" }])
  companySize: CompanySizes;

  @ManyToOne(() => Users, (users) => users.studies)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
}
