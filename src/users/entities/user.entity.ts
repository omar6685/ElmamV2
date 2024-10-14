import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  Timestamp,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  encrypted_password: string;

  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ type: 'timestamp', nullable: true })
  birthdate: Date;

  @Column({ unique: true, nullable: true })
  phone: string;

  @Column({ nullable: true })
  city: string;

  @Column({ type: 'boolean', nullable: true })
  sex: boolean;

  @Column({ type: 'boolean', nullable: true })
  work_in_company: boolean;

  @Column({ nullable: true })
  tax_number: string;

  @Column({ default: 0 })
  sign_in_count: number;

  @Column({ type: 'timestamp', nullable: true })
  current_sign_in_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  last_sign_in_at: Date;

  @Column({ nullable: true })
  current_sign_in_ip: string;

  @Column({ nullable: true })
  last_sign_in_ip: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Timestamp;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
  })
  updated_at: Timestamp;
}
