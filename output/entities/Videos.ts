import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("videos_pkey", ["id"], { unique: true })
@Entity("videos", { schema: "public" })
export class Videos {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("character varying", { name: "title", nullable: true })
  title: string | null;

  @Column("timestamp without time zone", { name: "created_at" })
  createdAt: Date;

  @Column("timestamp without time zone", { name: "updated_at" })
  updatedAt: Date;
}
