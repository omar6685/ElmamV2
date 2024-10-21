import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("roles_pkey", ["id"], { unique: true })
@Index(
  "index_roles_on_name_and_resource_type_and_resource_id",
  ["name", "resourceId", "resourceType"],
  {}
)
@Index("index_roles_on_resource", ["resourceId", "resourceType"], {})
@Entity("roles", { schema: "public" })
export class Roles {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("character varying", { name: "name", nullable: true })
  name: string | null;

  @Column("character varying", { name: "resource_type", nullable: true })
  resourceType: string | null;

  @Column("bigint", { name: "resource_id", nullable: true })
  resourceId: string | null;

  @Column("timestamp without time zone", { name: "created_at" })
  createdAt: Date;

  @Column("timestamp without time zone", { name: "updated_at" })
  updatedAt: Date;
}
