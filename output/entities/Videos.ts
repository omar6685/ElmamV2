import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Index("videos_pkey", ["id"], { unique: true })
@Entity("videos", { schema: "public" })
export class Videos {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("character varying", { name: "title", nullable: true })
  title: string | null;
  
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Timestamp;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Timestamp;
}
