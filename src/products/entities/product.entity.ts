import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Index('products_pkey', ['id'], { unique: true })
@Entity('products', { schema: 'public' })
export class Product {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('character varying', { name: 'name', nullable: true })
  name: string | null;

  @Column('character varying', { name: 'description', nullable: true })
  description: string | null;

  @Column('integer', { name: 'price', nullable: true })
  price: number | null;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Timestamp;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Timestamp;
}
