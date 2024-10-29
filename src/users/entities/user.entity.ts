import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
// import { ActivityGuides } from "./ActivityGuides";
// import { ActivityReports } from "./ActivityReports";
import { ArchiveRecord } from 'src/notifications/entities/archived-record.entity';
// import { Bills } from "./Bills";
// import { Discounts } from "./Discounts";
import { Entities } from 'src/entities/entities/entity.entity';
// import { Guides } from "./Guides";
import { Message } from 'src/messages/entities/message.entity';
// import { MihanMowatans } from "./MihanMowatans";
// import { Mihans } from "./Mihans";
// import { MihansCalculators } from "./MihansCalculators";
// import { NationalityReports } from "./NationalityReports";
import { Notification } from 'src/notifications/entities/notification.entity';
import { NotificationToken } from 'src/notifications/entities/notification-token.entity';
import { CommercialRegistrationNumber } from 'src/crns/entities/crn.entity';
// import { RelatedJobGuides } from "./RelatedJobGuides";
// import { RelatedJobs } from "./RelatedJobs";
// import { Studies } from "./Studies";
// import { Tickets } from "./Tickets";
// import { Workers } from "./Workers";

@Index('index_users_on_confirmation_token', ['confirmationToken'], {
  unique: true,
})
@Index('index_users_on_email', ['email'], { unique: true })
@Index('users_pkey', ['id'], { unique: true })
@Index('index_users_on_reset_password_token', ['resetPasswordToken'], {
  unique: true,
})
@Index('index_users_on_unlock_token', ['unlockToken'], { unique: true })
@Entity('users', { schema: 'public' })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column('character varying', { name: 'email', default: () => "''" })
  email: string;

  @Column('character varying', {
    name: 'encrypted_password',
    default: () => "''",
  })
  encryptedPassword: string;

  @Column('character varying', { name: 'reset_password_token', nullable: true })
  resetPasswordToken: string | null;

  @Column('timestamp without time zone', {
    name: 'reset_password_sent_at',
    nullable: true,
  })
  resetPasswordSentAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'remember_created_at',
    nullable: true,
  })
  rememberCreatedAt: Date | null;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Timestamp;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Timestamp;

  @Column('character varying', { name: 'confirmation_token', nullable: true })
  confirmationToken: string | null;

  @Column('timestamp without time zone', {
    name: 'confirmed_at',
    nullable: true,
  })
  confirmedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'confirmation_sent_at',
    nullable: true,
  })
  confirmationSentAt: Date | null;

  @Column('character varying', { name: 'unconfirmed_email', nullable: true })
  unconfirmedEmail: string | null;

  @Column('character varying', { name: 'first_name', nullable: true })
  firstName: string | null;

  @Column('character varying', { name: 'last_name', nullable: true })
  lastName: string | null;

  @Column('timestamp without time zone', { name: 'birthdate', nullable: true })
  birthdate: Date | null;

  @Column('character varying', { name: 'phone', nullable: true })
  phone: string | null;

  @Column('character varying', { name: 'city', nullable: true })
  city: string | null;

  @Column('boolean', { name: 'sex', nullable: true })
  sex: boolean | null;

  @Column('boolean', { name: 'work_in_company', nullable: true })
  workInCompany: boolean | null;

  @Column('integer', { name: 'sign_in_count', default: () => '0' })
  signInCount: number;

  @Column('timestamp without time zone', {
    name: 'current_sign_in_at',
    nullable: true,
  })
  currentSignInAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'last_sign_in_at',
    nullable: true,
  })
  lastSignInAt: Date | null;

  @Column('inet', { name: 'current_sign_in_ip', nullable: true })
  currentSignInIp: string | null;

  @Column('inet', { name: 'last_sign_in_ip', nullable: true })
  lastSignInIp: string | null;

  @Column('integer', { name: 'failed_attempts', default: () => '0' })
  failedAttempts: number;

  @Column('timestamp without time zone', { name: 'locked_at', nullable: true })
  lockedAt: Date | null;

  @Column('character varying', { name: 'unlock_token', nullable: true })
  unlockToken: string | null;

  @Column('character varying', { name: 'tax_number', nullable: true })
  taxNumber: string | null;

  // @OneToMany(() => ActivityGuides, (activityGuides) => activityGuides.user)
  // activityGuides: ActivityGuides[];
  //
  // // @OneToMany(() => ActivityReports, (activityReports) => activityReports.user)
  // activityReports: ActivityReports[];

  @OneToMany(() => ArchiveRecord, (archiveRecords) => archiveRecords.user)
  archiveRecords: ArchiveRecord[];

  // @OneToMany(() => Bills, (bills) => bills.user)
  // bills: Bills[];

  @OneToMany(
    () => CommercialRegistrationNumber,
    (commercialRegistrationNumbers) => commercialRegistrationNumbers.user,
  )
  commercialRegistrationNumbers: CommercialRegistrationNumber[];
  //
  // @OneToMany(() => Discounts, (discounts) => discounts.user)
  // discounts: Discounts[];
  //
  @OneToMany(() => Entities, (entities) => entities.user)
  entities: Entities[];
  //
  // @OneToMany(() => Guides, (guides) => guides.user)
  // guides: Guides[];

  @OneToMany(() => Message, (messages) => messages.user)
  messages: Message[];

  // @OneToMany(() => MihanMowatans, (mihanMowatans) => mihanMowatans.user)
  // mihanMowatans: MihanMowatans[];
  //
  // @OneToMany(() => Mihans, (mihans) => mihans.user)
  // mihans: Mihans[];
  //
  // @OneToMany(
  // () => MihansCalculators,
  // (mihansCalculators) => mihansCalculators.user,
  // )
  // mihansCalculators: MihansCalculators[];
  //
  // @OneToMany(
  // () => NationalityReports,
  // (nationalityReports) => nationalityReports.user,
  // )
  // nationalityReports: NationalityReports[];

  @OneToMany(() => Notification, (notifications) => notifications.user)
  notifications: Notification[];

  // @OneToMany(
  // () => RelatedJobGuides,
  // (relatedJobGuides) => relatedJobGuides.user,
  // )
  // relatedJobGuides: RelatedJobGuides[];
  //
  // @OneToMany(() => RelatedJobs, (relatedJobs) => relatedJobs.user)
  // relatedJobs: RelatedJobs[];
  //
  // @OneToMany(() => Studies, (studies) => studies.user)
  // studies: Studies[];
  //
  // @OneToMany(() => Tickets, (tickets) => tickets.user)
  // tickets: Tickets[];
  //
  // @OneToMany(() => Workers, (workers) => workers.user)
  // workers: Workers[];

  // One-to-Many relation with NotificationToken (A user can have many notification tokens)
  @OneToMany(
    () => NotificationToken,
    (notificationToken) => notificationToken.user,
  )
  notificationTokens: NotificationToken[];
}
