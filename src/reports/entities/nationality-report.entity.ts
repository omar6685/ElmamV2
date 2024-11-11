import { CommercialRegistrationNumber } from 'src/crns/entities/crn.entity';
import { Entities } from 'src/entities/entities/entity.entity';
import { User } from 'src/users/entities/user.entity';
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

@Index('entity_id', ['entityId'], {})
@Index('nationality_reports_pkey', ['id'], { unique: true })
@Index('index_nationality_reports_on_user_id', ['userId'], {})
@Entity('nationality_reports', { schema: 'public' })
export class NationalityReport {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

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
  userId: number;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @Column('bigint', {
    name: 'entity_id',
    default: () => '1',
  })
  entityId: number;

  @ManyToOne(() => Entities, (entities) => entities.nationalityReports)
  @JoinColumn([{ name: 'entity_id', referencedColumnName: 'id' }])
  entity: Entities;

  @ManyToOne(() => User, (users) => users.nationalityReports)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;
}
