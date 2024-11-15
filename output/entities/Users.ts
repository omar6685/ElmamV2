import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ActivityGuides } from "./ActivityGuides";
import { ActivityReports } from "./ActivityReports";
import { ArchiveRecords } from "./ArchiveRecords";
import { Bills } from "./Bills";
import { CommercialRegistrationNumbers } from "./CommercialRegistrationNumbers";
import { Discounts } from "./Discounts";
import { Entities } from "./Entities";
import { Guides } from "./Guides";
import { Messages } from "./Messages";
import { MihanMowatans } from "./MihanMowatans";
import { Mihans } from "./Mihans";
import { MihansCalculators } from "./MihansCalculators";
import { NationalityReports } from "./NationalityReports";
import { Notifications } from "./Notifications";
import { RelatedJobGuides } from "./RelatedJobGuides";
import { RelatedJobs } from "./RelatedJobs";
import { Studies } from "./Studies";
import { Tickets } from "./Tickets";
import { Workers } from "./Workers";

@Index("index_users_on_confirmation_token", ["confirmationToken"], {
  unique: true,
})
@Index("index_users_on_email", ["email"], { unique: true })
@Index("users_pkey", ["id"], { unique: true })
@Index("index_users_on_reset_password_token", ["resetPasswordToken"], {
  unique: true,
})
@Index("index_users_on_unlock_token", ["unlockToken"], { unique: true })
@Entity("users", { schema: "public" })
export class Users {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("character varying", { name: "email", default: () => "''" })
  email: string;

  @Column("character varying", {
    name: "encrypted_password",
    default: () => "''",
  })
  encryptedPassword: string;

  @Column("character varying", { name: "reset_password_token", nullable: true })
  resetPasswordToken: string | null;

  @Column("timestamp without time zone", {
    name: "reset_password_sent_at",
    nullable: true,
  })
  resetPasswordSentAt: Date | null;

  @Column("timestamp without time zone", {
    name: "remember_created_at",
    nullable: true,
  })
  rememberCreatedAt: Date | null;

  @Column("timestamp without time zone", { name: "created_at" })
  createdAt: Date;

  @Column("timestamp without time zone", { name: "updated_at" })
  updatedAt: Date;

  @Column("character varying", { name: "confirmation_token", nullable: true })
  confirmationToken: string | null;

  @Column("timestamp without time zone", {
    name: "confirmed_at",
    nullable: true,
  })
  confirmedAt: Date | null;

  @Column("timestamp without time zone", {
    name: "confirmation_sent_at",
    nullable: true,
  })
  confirmationSentAt: Date | null;

  @Column("character varying", { name: "unconfirmed_email", nullable: true })
  unconfirmedEmail: string | null;

  @Column("character varying", { name: "first_name", nullable: true })
  firstName: string | null;

  @Column("character varying", { name: "last_name", nullable: true })
  lastName: string | null;

  @Column("timestamp without time zone", { name: "birthdate", nullable: true })
  birthdate: Date | null;

  @Column("character varying", { name: "phone", nullable: true })
  phone: string | null;

  @Column("character varying", { name: "city", nullable: true })
  city: string | null;

  @Column("boolean", { name: "sex", nullable: true })
  sex: boolean | null;

  @Column("boolean", { name: "work_in_company", nullable: true })
  workInCompany: boolean | null;

  @Column("integer", { name: "sign_in_count", default: () => "0" })
  signInCount: number;

  @Column("timestamp without time zone", {
    name: "current_sign_in_at",
    nullable: true,
  })
  currentSignInAt: Date | null;

  @Column("timestamp without time zone", {
    name: "last_sign_in_at",
    nullable: true,
  })
  lastSignInAt: Date | null;

  @Column("inet", { name: "current_sign_in_ip", nullable: true })
  currentSignInIp: string | null;

  @Column("inet", { name: "last_sign_in_ip", nullable: true })
  lastSignInIp: string | null;

  @Column("integer", { name: "failed_attempts", default: () => "0" })
  failedAttempts: number;

  @Column("timestamp without time zone", { name: "locked_at", nullable: true })
  lockedAt: Date | null;

  @Column("character varying", { name: "unlock_token", nullable: true })
  unlockToken: string | null;

  @Column("character varying", { name: "tax_number", nullable: true })
  taxNumber: string | null;

  @OneToMany(() => ActivityGuides, (activityGuides) => activityGuides.user)
  activityGuides: ActivityGuides[];

  @OneToMany(() => ActivityReports, (activityReports) => activityReports.user)
  activityReports: ActivityReports[];

  @OneToMany(() => ArchiveRecords, (archiveRecords) => archiveRecords.user)
  archiveRecords: ArchiveRecords[];

  @OneToMany(() => Bills, (bills) => bills.user)
  bills: Bills[];

  @OneToMany(
    () => CommercialRegistrationNumbers,
    (commercialRegistrationNumbers) => commercialRegistrationNumbers.user
  )
  commercialRegistrationNumbers: CommercialRegistrationNumbers[];

  @OneToMany(() => Discounts, (discounts) => discounts.user)
  discounts: Discounts[];

  @OneToMany(() => Entities, (entities) => entities.user)
  entities: Entities[];

  @OneToMany(() => Guides, (guides) => guides.user)
  guides: Guides[];

  @OneToMany(() => Messages, (messages) => messages.user)
  messages: Messages[];

  @OneToMany(() => MihanMowatans, (mihanMowatans) => mihanMowatans.user)
  mihanMowatans: MihanMowatans[];

  @OneToMany(() => Mihans, (mihans) => mihans.user)
  mihans: Mihans[];

  @OneToMany(
    () => MihansCalculators,
    (mihansCalculators) => mihansCalculators.user
  )
  mihansCalculators: MihansCalculators[];

  @OneToMany(
    () => NationalityReports,
    (nationalityReports) => nationalityReports.user
  )
  nationalityReports: NationalityReports[];

  @OneToMany(() => Notifications, (notifications) => notifications.user)
  notifications: Notifications[];

  @OneToMany(
    () => RelatedJobGuides,
    (relatedJobGuides) => relatedJobGuides.user
  )
  relatedJobGuides: RelatedJobGuides[];

  @OneToMany(() => RelatedJobs, (relatedJobs) => relatedJobs.user)
  relatedJobs: RelatedJobs[];

  @OneToMany(() => Studies, (studies) => studies.user)
  studies: Studies[];

  @OneToMany(() => Tickets, (tickets) => tickets.user)
  tickets: Tickets[];

  @OneToMany(() => Workers, (workers) => workers.user)
  workers: Workers[];
}
