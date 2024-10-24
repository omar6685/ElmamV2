**ActionTextRichTexts**
========================
```ts
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
```

Iterface will be used to store notifications and message rich text

**ActiveStorageAttachments, ActiveStorageBlob, ActiveStorageVariantRecord**
===========================================================================
```ts
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
```

to store files and images

**ActivityGuides**
==================
```ts
@Index("activity_guides_pkey", ["id"], { unique: true })
@Index("index_activity_guides_on_user_id", ["userId"], {})
@Entity("activity_guides", { schema: "public" })
export class ActivityGuides {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("character varying", { name: "file", nullable: true })
  file: string | null;

  @Column("bigint", { name: "user_id" })
  userId: string;

  @Column("timestamp without time zone", { name: "created_at" })
  createdAt: Date;

  @Column("timestamp without time zone", { name: "updated_at" })
  updatedAt: Date;

  @ManyToOne(() => Users, (users) => users.activityGuides)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
}
```

**ActivityReports**
==================

reports on compnaies activities