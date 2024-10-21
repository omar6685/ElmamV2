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
  "index_mihan_mowatans_on_commercial_registration_number_id",
  ["commercialRegistrationNumberId"],
  {}
)
@Index("mihan_mowatans_pkey", ["id"], { unique: true })
@Index("index_mihan_mowatans_on_user_id", ["userId"], {})
@Entity("mihan_mowatans", { schema: "public" })
export class MihanMowatans {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("character varying", { name: "result", nullable: true })
  result: string | null;

  @Column("character varying", { name: "company_name", nullable: true })
  companyName: string | null;

  @Column("bigint", { name: "user_id" })
  userId: string;

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
      commercialRegistrationNumbers.mihanMowatans
  )
  @JoinColumn([
    { name: "commercial_registration_number_id", referencedColumnName: "id" },
  ])
  commercialRegistrationNumber: CommercialRegistrationNumbers;

  @ManyToOne(() => Users, (users) => users.mihanMowatans)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
}
