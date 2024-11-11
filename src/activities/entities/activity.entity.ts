import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Entities } from 'src/entities/entities/entity.entity';

@Index('activity_tables_pkey', ['id'], { unique: true })
@Entity('activity_tables', { schema: 'public' })
export class ActivityTables {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('character varying', { name: 'activitiy', nullable: true })
  activitiy: string | null;

  @Column('double precision', {
    name: 'fixed_value_low_green',
    nullable: true,
  })
  fixedValueLowGreen: number | null;

  @Column('double precision', {
    name: 'fixed_curve_value_low_green',
    nullable: true,
  })
  fixedCurveValueLowGreen: number | null;

  @Column('double precision', {
    name: 'fixed_value_mid_green',
    nullable: true,
  })
  fixedValueMidGreen: number | null;

  @Column('double precision', {
    name: 'fixed_curve_value_mid_green',
    nullable: true,
  })
  fixedCurveValueMidGreen: number | null;

  @Column('double precision', {
    name: 'fixed_value_hi_green',
    nullable: true,
  })
  fixedValueHiGreen: number | null;

  @Column('double precision', {
    name: 'fixed_curve_value_hi_green',
    nullable: true,
  })
  fixedCurveValueHiGreen: number | null;

  @Column('double precision', {
    name: 'fixed_value_platinium_green',
    nullable: true,
  })
  fixedValuePlatiniumGreen: number | null;

  @Column('double precision', {
    name: 'fixed_curve_value_platinium_green',
    nullable: true,
  })
  fixedCurveValuePlatiniumGreen: number | null;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Entities, (entities) => entities.activityTable)
  entities: Entities[];

  // @OneToMany(
  //   () => RelatedJobGuides,
  //   (relatedJobGuides) => relatedJobGuides.activityTable
  // )
  // relatedJobGuides: RelatedJobGuides[];

  // @OneToMany(() => RelatedJobs, (relatedJobs) => relatedJobs.activityTable)
  // relatedJobs: RelatedJobs[];

  // @OneToMany(() => Studies, (studies) => studies.activityTable)
  // studies: Studies[];
}