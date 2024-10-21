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
  "index_bills_on_commercial_registration_number_id",
  ["commercialRegistrationNumberId"],
  {}
)
@Index("bills_pkey", ["id"], { unique: true })
@Index("index_bills_on_user_id", ["userId"], {})
@Entity("bills", { schema: "public" })
export class Bills {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("bigint", { name: "commercial_registration_number_id" })
  commercialRegistrationNumberId: string;

  @Column("character varying", { name: "detail", nullable: true })
  detail: string | null;

  @Column("double precision", { name: "amount", nullable: true, precision: 53 })
  amount: number | null;

  @Column("double precision", {
    name: "taxed_amount",
    nullable: true,
    precision: 53,
  })
  taxedAmount: number | null;

  @Column("integer", { name: "discount", nullable: true })
  discount: number | null;

  @Column("integer", { name: "tax_percentage", nullable: true })
  taxPercentage: number | null;

  @Column("double precision", {
    name: "tax_amount",
    nullable: true,
    precision: 53,
  })
  taxAmount: number | null;

  @Column("double precision", { name: "total", nullable: true, precision: 53 })
  total: number | null;

  @Column("bigint", { name: "user_id" })
  userId: string;

  @Column("timestamp without time zone", { name: "created_at" })
  createdAt: Date;

  @Column("timestamp without time zone", { name: "updated_at" })
  updatedAt: Date;

  @ManyToOne(
    () => CommercialRegistrationNumbers,
    (commercialRegistrationNumbers) => commercialRegistrationNumbers.bills
  )
  @JoinColumn([
    { name: "commercial_registration_number_id", referencedColumnName: "id" },
  ])
  commercialRegistrationNumber: CommercialRegistrationNumbers;

  @ManyToOne(() => Users, (users) => users.bills)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
}
