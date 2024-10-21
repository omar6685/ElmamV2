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
  "index_active_storage_variant_records_uniqueness",
  ["blobId", "variationDigest"],
  { unique: true }
)
@Index("active_storage_variant_records_pkey", ["id"], { unique: true })
@Entity("active_storage_variant_records", { schema: "public" })
export class ActiveStorageVariantRecords {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("bigint", { name: "blob_id" })
  blobId: string;

  @Column("character varying", { name: "variation_digest" })
  variationDigest: string;

  @ManyToOne(
    () => ActiveStorageBlobs,
    (activeStorageBlobs) => activeStorageBlobs.activeStorageVariantRecords
  )
  @JoinColumn([{ name: "blob_id", referencedColumnName: "id" }])
  blob: ActiveStorageBlobs;
}
