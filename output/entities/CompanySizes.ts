import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Studies } from "./Studies";

@Index("company_sizes_pkey", ["id"], { unique: true })
@Entity("company_sizes", { schema: "public" })
export class CompanySizes {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("character varying", { name: "size", nullable: true })
  size: string | null;

  @Column("timestamp without time zone", { name: "created_at" })
  createdAt: Date;

  @Column("timestamp without time zone", { name: "updated_at" })
  updatedAt: Date;

  @OneToMany(() => Studies, (studies) => studies.companySize)
  studies: Studies[];
}
