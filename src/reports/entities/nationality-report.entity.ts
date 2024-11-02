import { CommercialRegistrationNumber } from 'src/crns/entities/crn.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index(
  'index_nationality_reports_on_commercial_registration_number_id',
  ['commercialRegistrationNumberId'],
  {},
)
@Index('nationality_reports_pkey', ['id'], { unique: true })
@Index('index_nationality_reports_on_user_id', ['userId'], {})
@Entity('nationality_reports', { schema: 'public' })
export class NationalityReport {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('character varying', { name: 'result', nullable: true })
  result: string | null; // number of each nationality with their percentage separated by commas

  @Column('double precision', { name: 'saudis', nullable: true })
  saudis: number | null;

  @Column('double precision', {
    name: 'total_employees',
    nullable: true,
  })
  totalEmployees: number | null;

  @Column('character varying', { name: 'max_addition', nullable: true })
  maxAddition: string | null; // how many you can add to each nationality

  @Column('character varying', { name: 'name', nullable: true })
  name: string | null;

  @Column('bigint', { name: 'user_id' })
  userId: string;

  @Column('timestamp without time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp without time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('bigint', {
    name: 'commercial_registration_number_id',
    default: () => '1',
  })
  commercialRegistrationNumberId: string;

  @ManyToOne(
    () => CommercialRegistrationNumber,
    (commercialRegistrationNumbers) =>
      commercialRegistrationNumbers.nationalityReports,
  )
  @JoinColumn([
    { name: 'commercial_registration_number_id', referencedColumnName: 'id' },
  ])
  commercialRegistrationNumber: CommercialRegistrationNumber;

  @ManyToOne(() => User, (users) => users.nationalityReports)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;
}
