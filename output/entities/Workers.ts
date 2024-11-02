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
  "index_workers_on_commercial_registration_number_id",
  ["commercialRegistrationNumberId"],
  {}
)
@Index("workers_pkey", ["id"], { unique: true })
@Index("index_workers_on_user_id", ["userId"], {})
@Entity("workers", { schema: "public" })
export class Workers {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("character varying", { name: "xlsx_file", nullable: true })
  xlsxFile: string | null;

  @Column("character varying", { name: "csv_file", nullable: true })
  csvFile: string | null;

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
    (commercialRegistrationNumbers) => commercialRegistrationNumbers.workers
  )
  @JoinColumn([
    { name: "commercial_registration_number_id", referencedColumnName: "id" },
  ])
  commercialRegistrationNumber: CommercialRegistrationNumbers;

  @ManyToOne(() => Users, (users) => users.workers)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
}
