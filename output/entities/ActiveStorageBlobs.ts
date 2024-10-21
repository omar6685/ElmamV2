import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ActiveStorageAttachments } from "./ActiveStorageAttachments";
import { ActiveStorageVariantRecords } from "./ActiveStorageVariantRecords";

@Index("active_storage_blobs_pkey", ["id"], { unique: true })
@Index("index_active_storage_blobs_on_key", ["key"], { unique: true })
@Entity("active_storage_blobs", { schema: "public" })
export class ActiveStorageBlobs {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("character varying", { name: "key" })
  key: string;

  @Column("character varying", { name: "filename" })
  filename: string;

  @Column("character varying", { name: "content_type", nullable: true })
  contentType: string | null;

  @Column("text", { name: "metadata", nullable: true })
  metadata: string | null;

  @Column("character varying", { name: "service_name" })
  serviceName: string;

  @Column("bigint", { name: "byte_size" })
  byteSize: string;

  @Column("character varying", { name: "checksum", nullable: true })
  checksum: string | null;

  @Column("timestamp without time zone", { name: "created_at" })
  createdAt: Date;

  @OneToMany(
    () => ActiveStorageAttachments,
    (activeStorageAttachments) => activeStorageAttachments.blob
  )
  activeStorageAttachments: ActiveStorageAttachments[];

  @OneToMany(
    () => ActiveStorageVariantRecords,
    (activeStorageVariantRecords) => activeStorageVariantRecords.blob
  )
  activeStorageVariantRecords: ActiveStorageVariantRecords[];
}
