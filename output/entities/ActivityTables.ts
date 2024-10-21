import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Entities } from "./Entities";
import { RelatedJobGuides } from "./RelatedJobGuides";
import { RelatedJobs } from "./RelatedJobs";
import { Studies } from "./Studies";

@Index("activity_tables_pkey", ["id"], { unique: true })
@Entity("activity_tables", { schema: "public" })
export class ActivityTables {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("character varying", { name: "activitiy", nullable: true })
  activitiy: string | null;

  @Column("double precision", {
    name: "fixed_value_low_green",
    nullable: true,
    precision: 53,
  })
  fixedValueLowGreen: number | null;

  @Column("double precision", {
    name: "fixed_curve_value_low_green",
    nullable: true,
    precision: 53,
  })
  fixedCurveValueLowGreen: number | null;

  @Column("double precision", {
    name: "fixed_value_mid_green",
    nullable: true,
    precision: 53,
  })
  fixedValueMidGreen: number | null;

  @Column("double precision", {
    name: "fixed_curve_value_mid_green",
    nullable: true,
    precision: 53,
  })
  fixedCurveValueMidGreen: number | null;

  @Column("double precision", {
    name: "fixed_value_hi_green",
    nullable: true,
    precision: 53,
  })
  fixedValueHiGreen: number | null;

  @Column("double precision", {
    name: "fixed_curve_value_hi_green",
    nullable: true,
    precision: 53,
  })
  fixedCurveValueHiGreen: number | null;

  @Column("double precision", {
    name: "fixed_value_platinium_green",
    nullable: true,
    precision: 53,
  })
  fixedValuePlatiniumGreen: number | null;

  @Column("double precision", {
    name: "fixed_curve_value_platinium_green",
    nullable: true,
    precision: 53,
  })
  fixedCurveValuePlatiniumGreen: number | null;

  @Column("timestamp without time zone", { name: "created_at" })
  createdAt: Date;

  @Column("timestamp without time zone", { name: "updated_at" })
  updatedAt: Date;

  @OneToMany(() => Entities, (entities) => entities.activityTable)
  entities: Entities[];

  @OneToMany(
    () => RelatedJobGuides,
    (relatedJobGuides) => relatedJobGuides.activityTable
  )
  relatedJobGuides: RelatedJobGuides[];

  @OneToMany(() => RelatedJobs, (relatedJobs) => relatedJobs.activityTable)
  relatedJobs: RelatedJobs[];

  @OneToMany(() => Studies, (studies) => studies.activityTable)
  studies: Studies[];
}
