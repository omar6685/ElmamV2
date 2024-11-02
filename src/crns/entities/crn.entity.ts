import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { CrnEntities } from 'src/entities/entities/crn-entity.entity';
import { Entities } from 'src/entities/entities/entity.entity';
import { User } from 'src/users/entities/user.entity';
//   import { ActivityReports } from "./ActivityReports";
//   import { Bills } from "./Bills";
//   import { CrnEntities } from "./CrnEntities";
//   import { MihanMowatans } from "./MihanMowatans";
//   import { Mihans } from "./Mihans";
//   import { NationalityReports } from "./NationalityReports";
//   import { RelatedJobs } from "./RelatedJobs";
//   import { Studies } from "./Studies";
//   import { Workers } from "./Workers";

@Index('commercial_registration_numbers_pkey', ['id'], { unique: true })
@Index('index_commercial_registration_numbers_on_user_id', ['userId'], {})
@Entity('commercial_registration_numbers', { schema: 'public' })
export class CommercialRegistrationNumber {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column('character varying', { name: 'cr_name', nullable: true })
  crName: string | null;

  @Column('character varying', { name: 'cr_type', nullable: true })
  crType: string | null;

  @Column('character varying', { name: 'cr_expiry_date', nullable: true })
  crExpiryDate: string | null;

  @Column('character varying', { name: 'cr_main_number', nullable: true })
  crMainNumber: string | null;

  @Column('character varying', {
    name: 'subscription_status',
    nullable: true,
    default: () => "'incomplete'",
  })
  subscriptionStatus: string | null;

  @Column('timestamp without time zone', {
    name: 'current_period_end',
    nullable: true,
  })
  currentPeriodEnd: Date | null;

  @Column('bigint', { name: 'user_id' })
  userId: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @Column('character varying', { name: 'cr_number', nullable: true })
  crNumber: string | null;

  @Column('character varying', { name: 'cr_issue_date', nullable: true })
  crIssueDate: string | null;

  @Column('double precision', {
    name: 'true_cr_number',
    nullable: true,
  })
  trueCrNumber: number | null;

  @Column('double precision', {
    name: 'cr_entity_number',
    nullable: true,
  })
  crEntityNumber: number | null;

  @Column('double precision', {
    name: 'cr_main_entity_number',
    nullable: true,
  })
  crMainEntityNumber: number | null;

  @Column('character varying', { name: 'business_type', nullable: true })
  businessType: string | null;

  @Column('character varying', { name: 'cr_status', nullable: true })
  crStatus: string | null;

  @Column('character varying', { name: 'location', nullable: true })
  location: string | null;

  @Column('character varying', { name: 'company', nullable: true })
  company: string | null;

  @Column('character varying', { name: 'activities', nullable: true })
  activities: string | null;

  //   @OneToMany(
  //     () => ActivityReports,
  //     (activityReports) => activityReports.commercialRegistrationNumber,
  //   )
  //   activityReports: ActivityReports[];

  //   @OneToMany(() => Bills, (bills) => bills.commercialRegistrationNumber)
  //   bills: Bills[];

  @ManyToOne(() => User, (users) => users.commercialRegistrationNumbers)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;

  @OneToMany(
    () => CrnEntities,
    (crnEntities) => crnEntities.commercialRegistrationNumber,
  )
  crnEntities: CrnEntities[];

  @OneToMany(
    () => Entities,
    (entities) => entities.commercialRegistrationNumber,
  )
  entities: Entities[];

  //   @OneToMany(
  //     () => MihanMowatans,
  //     (mihanMowatans) => mihanMowatans.commercialRegistrationNumber,
  //   )
  //   mihanMowatans: MihanMowatans[];

  //   @OneToMany(() => Mihans, (mihans) => mihans.commercialRegistrationNumber)
  //   mihans: Mihans[];

  //   @OneToMany(
  //     () => NationalityReports,
  //     (nationalityReports) => nationalityReports.commercialRegistrationNumber,
  //   )
  //   nationalityReports: NationalityReports[];

  //   @OneToMany(
  //     () => RelatedJobs,
  //     (relatedJobs) => relatedJobs.commercialRegistrationNumber,
  //   )
  //   relatedJobs: RelatedJobs[];

  //   @OneToMany(() => Studies, (studies) => studies.commercialRegistrationNumber)
  //   studies: Studies[];

  //   @OneToMany(() => Workers, (workers) => workers.commercialRegistrationNumber)
  //   workers: Workers[];
}
