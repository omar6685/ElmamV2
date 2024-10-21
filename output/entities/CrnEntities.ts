import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CommercialRegistrationNumbers } from "./CommercialRegistrationNumbers";
import { Entities } from "./Entities";

@Index(
  "index_crn_entities_on_commercial_registration_number_id",
  ["commercialRegistrationNumberId"],
  {}
)
@Index("index_crn_entities_on_entity_id", ["entityId"], {})
@Index("crn_entities_pkey", ["id"], { unique: true })
@Entity("crn_entities", { schema: "public" })
export class CrnEntities {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("bigint", { name: "entity_id" })
  entityId: string;

  @Column("timestamp without time zone", { name: "created_at" })
  createdAt: Date;

  @Column("timestamp without time zone", { name: "updated_at" })
  updatedAt: Date;

  @Column("bigint", { name: "commercial_registration_number_id" })
  commercialRegistrationNumberId: string;

  @Column("character varying", { name: "xlsx_file_local", nullable: true })
  xlsxFileLocal: string | null;

  @Column("character varying", { name: "csv_file_local", nullable: true })
  csvFileLocal: string | null;

  @ManyToOne(
    () => CommercialRegistrationNumbers,
    (commercialRegistrationNumbers) => commercialRegistrationNumbers.crnEntities
  )
  @JoinColumn([
    { name: "commercial_registration_number_id", referencedColumnName: "id" },
  ])
  commercialRegistrationNumber: CommercialRegistrationNumbers;

  @ManyToOne(() => Entities, (entities) => entities.crnEntities)
  @JoinColumn([{ name: "entity_id", referencedColumnName: "id" }])
  entity: Entities;
}
