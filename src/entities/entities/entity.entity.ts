import { CommercialRegistrationNumber } from 'src/crns/entities/crn.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
//   import { CrnEntities } from "./CrnEntities";
//    import { ActivityTables } from "./ActivityTables";

@Index('index_entities_on_activity_table_id', ['activityTableId'], {})
@Index(
  'index_entities_on_commercial_registration_number_id',
  ['commercialRegistrationNumberId'],
  {},
)
@Index('entities_pkey', ['id'], { unique: true })
@Index('index_entities_on_user_id', ['userId'], {})
@Entity('entities', { schema: 'public' })
export class Entities {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column('boolean', { name: 'adaptation', nullable: true })
  adaptation: boolean | null;

  @Column('integer', { name: 'ajier', nullable: true })
  ajier: number | null;

  @Column('integer', { name: 'saudi_player', nullable: true })
  saudiPlayer: number | null;

  @Column('integer', { name: 'saudi_jailed', nullable: true })
  saudiJailed: number | null;

  @Column('integer', { name: 'saudi_disable', nullable: true })
  saudiDisable: number | null;

  @Column('integer', { name: 'saudi_online', nullable: true })
  saudiOnline: number | null;

  @Column('integer', { name: 'saudi_student', nullable: true })
  saudiStudent: number | null;

  @Column('integer', { name: 'foreigner_like_saudi', nullable: true })
  foreignerLikeSaudi: number | null;

  @Column('integer', { name: 'foreigner_like_foreigner', nullable: true })
  foreignerLikeForeigner: number | null;

  @Column('integer', { name: 'saudi_loan_player', nullable: true })
  saudiLoanPlayer: number | null;

  @Column('integer', { name: 'gulf_citizen', nullable: true })
  gulfCitizen: number | null;

  @Column('integer', { name: 'tribe_saudi', nullable: true })
  tribeSaudi: number | null;

  @Column('integer', { name: 'specialy_foreigner', nullable: true })
  specialyForeigner: number | null;

  @Column('integer', { name: 'owner', nullable: true })
  owner: number | null;

  @Column('double precision', {
    name: 'real_foreigner',
    nullable: true,
  })
  realForeigner: number | null;

  @Column('double precision', {
    name: 'real_saudi',
    nullable: true,
  })
  realSaudi: number | null;

  @Column('bigint', { name: 'commercial_registration_number_id' })
  commercialRegistrationNumberId: string;

  @Column('timestamp without time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp without time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('bigint', { name: 'user_id' })
  userId: string;

  @Column('bigint', { name: 'activity_table_id' })
  activityTableId: string;

//   @OneToMany(() => CrnEntities, (crnEntities) => crnEntities.entity)
//   crnEntities: CrnEntities[];
// 
//   @ManyToOne(() => ActivityTables, (activityTables) => activityTables.entities)
//   @JoinColumn([{ name: 'activity_table_id', referencedColumnName: 'id' }])
//   activityTable: ActivityTables;

  @ManyToOne(
    () => CommercialRegistrationNumber,
    (commercialRegistrationNumbers) => commercialRegistrationNumbers.entities,
  )
  @JoinColumn([
    { name: 'commercial_registration_number_id', referencedColumnName: 'id' },
  ])
  commercialRegistrationNumber: CommercialRegistrationNumber;

  @ManyToOne(() => User, (users) => users.entities)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;
}
