/**import {
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
 */

import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { ActivityTables } from 'src/activities/entities/activity.entity';

export default class ActivityTablesSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    console.log('ActivityTables seeding in progress... ⏳');

    await dataSource.query('TRUNCATE "activity_tables" RESTART IDENTITY;');

    const repository = dataSource.getRepository(ActivityTables);

    // seeding
    await repository.insert({
      activitiy: 'Activity 1',
      fixedValueLowGreen: 1,
      fixedCurveValueLowGreen: 1,
      fixedValueMidGreen: 1,
      fixedCurveValueMidGreen: 1,
      fixedValueHiGreen: 1,
      fixedCurveValueHiGreen: 1,
      fixedValuePlatiniumGreen: 1,
      fixedCurveValuePlatiniumGreen: 1,
    });
    await repository.insert({
      activitiy: 'Activity 2',
      fixedValueLowGreen: 2,
      fixedCurveValueLowGreen: 2,
      fixedValueMidGreen: 2,
      fixedCurveValueMidGreen: 2,
      fixedValueHiGreen: 2,
      fixedCurveValueHiGreen: 2,
      fixedValuePlatiniumGreen: 2,
      fixedCurveValuePlatiniumGreen: 2,
    });
    await repository.insert({
      activitiy: 'Activity 3',
      fixedValueLowGreen: 3,
      fixedCurveValueLowGreen: 3,
      fixedValueMidGreen: 3,
      fixedCurveValueMidGreen: 3,
      fixedValueHiGreen: 3,
      fixedCurveValueHiGreen: 3,
      fixedValuePlatiniumGreen: 3,
      fixedCurveValuePlatiniumGreen: 3,
    });

    console.log('ActivityTables Seeded ✅');
  }
}
