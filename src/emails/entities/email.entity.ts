import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
} from 'typeorm';

@Entity('email_templates')
export class EmailTemplate {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  subject: string;

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Timestamp;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Timestamp;
}
