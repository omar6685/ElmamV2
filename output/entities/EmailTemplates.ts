import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("email_templates_pkey", ["id"], { unique: true })
@Entity("email_templates", { schema: "public" })
export class EmailTemplates {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("character varying", { name: "name", nullable: true })
  name: string | null;

  @Column("character varying", { name: "subject", nullable: true })
  subject: string | null;

  @Column("text", { name: "content", nullable: true })
  content: string | null;

  @Column("timestamp without time zone", { name: "created_at" })
  createdAt: Date;

  @Column("timestamp without time zone", { name: "updated_at" })
  updatedAt: Date;
}
