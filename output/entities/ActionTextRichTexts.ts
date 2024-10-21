import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("action_text_rich_texts_pkey", ["id"], { unique: true })
@Index(
  "index_action_text_rich_texts_uniqueness",
  ["name", "recordId", "recordType"],
  { unique: true }
)
@Entity("action_text_rich_texts", { schema: "public" })
export class ActionTextRichTexts {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("character varying", { name: "name" })
  name: string;

  @Column("text", { name: "body", nullable: true })
  body: string | null;

  @Column("character varying", { name: "record_type" })
  recordType: string;

  @Column("bigint", { name: "record_id" })
  recordId: string;

  @Column("timestamp without time zone", { name: "created_at" })
  createdAt: Date;

  @Column("timestamp without time zone", { name: "updated_at" })
  updatedAt: Date;
}
