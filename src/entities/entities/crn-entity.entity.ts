import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { CommercialRegistrationNumber } from 'src/crns/entities/crn.entity';
import { Entities } from './entity.entity';

@Index(
  'index_crn_entities_on_commercial_registration_number_id',
  ['commercialRegistrationNumberId'],
  {},
)
@Index('index_crn_entities_on_entity_id', ['entityId'], {})
@Index('crn_entities_pkey', ['id'], { unique: true })
@Entity('crn_entities', { schema: 'public' })
export class CrnEntities {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('bigint', { name: 'entity_id' })
  entityId: number;

  @Column('boolean', { name: 'adaptation', nullable: true })
  adaptation: boolean;

  @Column('character varying', { name: 'logo_url' })
  logoUrl: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @Column('bigint', { name: 'commercial_registration_number_id' })
  commercialRegistrationNumberId: number;

  @Column('character varying', { name: 'xlsx_file_local', nullable: true })
  xlsxFileLocal: string | null;

  @Column('character varying', {
    name: 'subscribers_xlsx_file',
    nullable: true,
  })
  subscribersXlsxFile: string | null;

  @Column('character varying', {
    name: 'resident_xlsx_file',
    nullable: true,
  })
  residentXlsxFile: string | null;

  @Column('jsonb', {
    name: 'nationalities',
    nullable: true,
    array: false,
  })
  nationalities: Array<{ name: string; count: number }> | null;

  @ManyToOne(
    () => CommercialRegistrationNumber,
    (commercialRegistrationNumbers) =>
      commercialRegistrationNumbers.crnEntities,
  )
  @JoinColumn([
    { name: 'commercial_registration_number_id', referencedColumnName: 'id' },
  ])
  commercialRegistrationNumber: CommercialRegistrationNumber;

  @ManyToOne(() => Entities, (entities) => entities.crnEntities)
  @JoinColumn([{ name: 'entity_id', referencedColumnName: 'id' }])
  entity: Entities;
}

// add logourl (on cloudinary), adaptation (taha9o9), new excel files for: subscribers, resident (mo9im),
