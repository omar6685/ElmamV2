import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ActiveStorageBlobs } from "./ActiveStorageBlobs";

@Index(
  "index_active_storage_attachments_uniqueness",
  ["blobId", "name", "recordId", "recordType"],
  { unique: true }
)
@Index("index_active_storage_attachments_on_blob_id", ["blobId"], {})
@Index("active_storage_attachments_pkey", ["id"], { unique: true })
@Entity("active_storage_attachments", { schema: "public" })
export class ActiveStorageAttachments {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("character varying", { name: "name" })
  name: string;

  @Column("character varying", { name: "record_type" })
  recordType: string;

  @Column("bigint", { name: "record_id" })
  recordId: string;

  @Column("bigint", { name: "blob_id" })
  blobId: string;

  @Column("timestamp without time zone", { name: "created_at" })
  createdAt: Date;

  @ManyToOne(
    () => ActiveStorageBlobs,
    (activeStorageBlobs) => activeStorageBlobs.activeStorageAttachments
  )
  @JoinColumn([{ name: "blob_id", referencedColumnName: "id" }])
  blob: ActiveStorageBlobs;
}
