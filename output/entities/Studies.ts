import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ActivityTables } from './ActivityTables';
import { CommercialRegistrationNumbers } from './CommercialRegistrationNumbers';
import { CompanySizes } from './CompanySizes';
import { Users } from './Users';

@Index('index_studies_on_activity_table_id', ['activityTableId'], {})
@Index(
  'index_studies_on_commercial_registration_number_id',
  ['commercialRegistrationNumberId'],
  {},
)
@Index('index_studies_on_company_size_id', ['companySizeId'], {})
@Index('studies_pkey', ['id'], { unique: true })
@Index('index_studies_on_user_id', ['userId'], {})
@Entity('studies', { schema: 'public' })
export class Studies {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('bigint', { name: 'activity_table_id' })
  activityTableId: string;

  @Column('bigint', { name: 'company_size_id' })
  companySizeId: string;

  @Column('character varying', { name: 'branch', nullable: true })
  branch: string; // number of companies

  @Column('double precision', {
    name: 'foreigner',
    nullable: true,
  })
  foreigner: number | null; // all 

  @Column('double precision', { name: 'saudi', nullable: true })
  saudi: number | null;

  @Column('integer', { name: 'ajier', nullable: true })
  ajier: number | null;

  @Column('double precision', {
    name: 'real_foreigner',
    nullable: true,
  })
  realForeigner: number | null; // how they counted in goverment system (can be a float)

  @Column('double precision', {
    name: 'real_saudi',
    nullable: true,
  })
  realSaudi: number | null;

  @Column('integer', { name: 'saudi_four', nullable: true })
  saudiFour: number | null; // like cryple people

  @Column('integer', { name: 'saudi_three_four', nullable: true })
  saudiThreeFour: number | null; // salary 3000-4000

  @Column('integer', { name: 'saudi_three', nullable: true })
  saudiThree: number | null; //<30000

  @Column('integer', { name: 'visa', nullable: true })
  visa: number | null;

  @Column('integer', { name: 'saudi_disable', nullable: true })
  saudiDisable: number | null;

  @Column('boolean', { name: 'adaptation', nullable: true })
  adaptation: boolean | null;

  @Column('integer', { name: 'saudi_jailed', nullable: true })
  saudiJailed: number | null;

  @Column('integer', { name: 'saudi_student', nullable: true })
  saudiStudent: number | null;

  @Column('integer', { name: 'saudi_online', nullable: true })
  saudiOnline: number | null;

  @Column('integer', { name: 'saudi_player', nullable: true })
  saudiPlayer: number | null;

  @Column('integer', { name: 'saudi_loan_player', nullable: true })
  saudiLoanPlayer: number | null;

  @Column('integer', { name: 'foreigner_like_saudi', nullable: true })
  foreignerLikeSaudi: number | null;

  @Column('integer', { name: 'foreigner_like_foreigner', nullable: true })
  foreignerLikeForeigner: number | null;

  @Column('integer', { name: 'specialy_foreigner', nullable: true })
  specialyForeigner: number | null;

  @Column('integer', { name: 'tribe_saudi', nullable: true })
  tribeSaudi: number | null;

  @Column('integer', { name: 'gulf_citizen', nullable: true })
  gulfCitizen: number | null;

  @Column('integer', { name: 'owner', nullable: true })
  owner: number | null;

  @Column('integer', { name: 'red_week', nullable: true })
  redWeek: number | null;

  @Column('integer', { name: 'uncounted_saudi', nullable: true })
  uncountedSaudi: number | null;

  @Column('timestamp without time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp without time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('bigint', { name: 'user_id', nullable: true })
  userId: number | null;

  @Column('bigint', {
    name: 'commercial_registration_number_id',
    nullable: true,
  })
  commercialRegistrationNumberId: string | null;

  //////// Calculated fields /////////////////////

  @Column('double precision', {
    name: 'saudi_addition_count_to_low',
    nullable: true,
  })
  saudiAdditionCountToLow: number | null; // number of saudis we can ADD to reach low green level (nita9)

  @Column('double precision', {
    name: 'saudi_addition_count_to_mid',
    nullable: true,
  })
  saudiAdditionCountToMid: number | null; // number of saudis we can ADD to reach middle green level (nita9)

  @Column('double precision', {
    name: 'saudi_addition_count_to_hi',
    nullable: true,
  })
  saudiAdditionCountToHi: number | null; // number of saudis we can ADD to reach high green level (nita9)

  @Column('double precision', {
    name: 'saudi_addition_count_to_platinium',
    nullable: true,
  })
  saudiAdditionCountToPlatinium: number | null; // number of saudis we can ADD to reach platinium level (nita9)

  @Column('double precision', {
    name: 'forigner_subtraction_count_to_low',
    nullable: true,
  })
  forignerSubtractionCountToLow: number | null; // number of foreigners we can REMOVE to reach low green level (nita9)

  @Column('double precision', {
    name: 'forigner_subtraction_count_to_mid',
    nullable: true,
  })
  forignerSubtractionCountToMid: number | null; // number of foreigners we can REMOVE to reach mid green level (nita9)

  @Column('double precision', {
    name: 'forigner_subtraction_count_to_hi',
    nullable: true,
  })
  forignerSubtractionCountToHi: number | null; // number of foreigners we can REMOVE to reach high green level (nita9)

  @Column('double precision', {
    name: 'forigner_subtraction_count_to_platinium',
    nullable: true,
  })
  forignerSubtractionCountToPlatinium: number | null; // number of foreigners we can REMOVE to reach platinium level (nita9)

  @Column('double precision', {
    name: 'saudizm',
    nullable: true,
  })
  saudizm: number | null; // percentage of saudis in the entity

  @Column('character varying', { name: 'status', nullable: true })
  status: string | null; //RED, LOW GREEN, MID GREEN, HIGH GREEN, PLATINUM

  @Column('double precision', {
    name: 'visas_count',
    nullable: true,
  })
  visasCount: number | null;

  @Column('double precision', {
    name: 'foreigners_allowed',
    nullable: true,
  })
  foreignersAllowed: number | null; // number of foreigners that can be added without affecting the current level

  @Column('double precision', {
    name: 'saudis_not_needed',
    nullable: true,
  })
  saudisNotNeeded: number | null;// number of saudis that can be fired without affecting the current level

  @Column('double precision', {
    name: 'visas_count_low',
    nullable: true,
  })
  visasCountLow: number | null; // how many fireigners we can bring from outside the country if we reach the low green level

  @Column('double precision', {
    name: 'visas_count_mid',
    nullable: true,
  })
  visasCountMid: number | null;

  @Column('double precision', {
    name: 'visas_count_hi',
    nullable: true,
  })
  visasCountHi: number | null;

  @Column('double precision', {
    name: 'visas_count_platinium',
    nullable: true,
  })
  visasCountPlatinium: number | null;

  @Column('double precision', {
    name: 'saudis_needed_low',
    nullable: true,
  })
  saudisNeededLow: number | null; // how many foreigners we can hire after firing off foreigners to reach low green level

  @Column('double precision', {
    name: 'saudis_needed_mid',
    nullable: true,
  })
  saudisNeededMid: number | null;

  @Column('double precision', {
    name: 'saudis_needed_hi',
    nullable: true,
  })
  saudisNeededHi: number | null;

  @Column('double precision', {
    name: 'saudis_needed_platinium',
    nullable: true,
  })
  saudisNeededPlatinium: number | null;

  @ManyToOne(() => ActivityTables, (activityTables) => activityTables.studies)
  @JoinColumn([{ name: 'activity_table_id', referencedColumnName: 'id' }])
  activityTable: ActivityTables;

  @ManyToOne(
    () => CommercialRegistrationNumbers,
    (commercialRegistrationNumbers) => commercialRegistrationNumbers.studies,
  )
  @JoinColumn([
    { name: 'commercial_registration_number_id', referencedColumnName: 'id' },
  ])
  commercialRegistrationNumber: CommercialRegistrationNumbers;

  @ManyToOne(() => CompanySizes, (companySizes) => companySizes.studies)
  @JoinColumn([{ name: 'company_size_id', referencedColumnName: 'id' }])
  companySize: CompanySizes;

  @ManyToOne(() => Users, (users) => users.studies)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;
}
