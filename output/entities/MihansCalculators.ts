import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";

@Index("mihans_calculators_pkey", ["id"], { unique: true })
@Index("index_mihans_calculators_on_user_id", ["userId"], {})
@Entity("mihans_calculators", { schema: "public" })
export class MihansCalculators {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("character varying", { name: "title_job", nullable: true })
  titleJob: string | null;

  @Column("integer", { name: "foreigners_count", nullable: true })
  foreignersCount: number | null;

  @Column("integer", { name: "required_saudis", nullable: true })
  requiredSaudis: number | null;

  @Column("double precision", {
    name: "required_percentage",
    nullable: true,
    precision: 53,
  })
  requiredPercentage: number | null;

  @Column("text", { name: "conditions", nullable: true })
  conditions: string | null;

  @Column("text", { name: "punishments", nullable: true })
  punishments: string | null;

  @Column("text", { name: "jobs", nullable: true })
  jobs: string | null;

  @Column("timestamp without time zone", { name: "created_at" })
  createdAt: Date;

  @Column("timestamp without time zone", { name: "updated_at" })
  updatedAt: Date;

  @Column("bigint", { name: "user_id" })
  userId: string;

  @Column("integer", { name: "saudis_condition", nullable: true })
  saudisCondition: number | null;

  @ManyToOne(() => Users, (users) => users.mihansCalculators)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
}
