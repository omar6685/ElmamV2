import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("contacts_pkey", ["id"], { unique: true })
@Entity("contacts", { schema: "public" })
export class Contacts {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("character varying", { name: "full_name", nullable: true })
  fullName: string | null;

  @Column("character varying", { name: "phone_number", nullable: true })
  phoneNumber: string | null;

  @Column("character varying", { name: "email", nullable: true })
  email: string | null;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("timestamp without time zone", { name: "created_at" })
  createdAt: Date;

  @Column("timestamp without time zone", { name: "updated_at" })
  updatedAt: Date;
}
