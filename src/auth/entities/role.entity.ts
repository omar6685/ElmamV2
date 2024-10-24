import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Timestamp,
  PrimaryColumn,
} from 'typeorm';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Timestamp;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
  })
  updatedAt: Timestamp;
}

@Entity('users_roles')
export class UserRole {
  @PrimaryColumn()
  user_id: number;

  @PrimaryColumn()
  role_id: number;
}
