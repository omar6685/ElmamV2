import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { APP_GUARD } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesGuard } from './shared/guards/roles.guard';
import { StudiesModule } from './studies/studies.module';
import { NotificationsModule } from './notifications/notifications.module';
import { MessagesModule } from './messages/messages.module';
import { EmailsModule } from './emails/emails.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { User } from './users/entities/user.entity';
import { Notification } from './notifications/entities/notification.entity';
import { NotificationToken } from './notifications/entities/notification-token.entity';
import { Message } from './messages/entities/message.entity';
import { Role, UserRole } from './auth/entities/role.entity';
import { EmailTemplate } from './emails/entities/email.entity';
import { ArchiveRecord } from './notifications/entities/archived-record.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [
        User,
        Notification,
        NotificationToken,
        ArchiveRecord,
        Message,
        Role,
        UserRole,
        EmailTemplate,
      ],
      migrations: [
        /*...*/
      ],
      // entities: ['src/**/*.entity{.ts,.js}'],
      ssl: true,
      synchronize: false, //process.env.NODE_ENV == 'development', // only synchronize in development mode
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.NODEMAILER_HOST,
        port: Number(process.env.NODEMAILER_PORT),
        secure: false,
        auth: {
          user: process.env.NODEMAILER_USER,
          pass: process.env.NODEMAILER_PASSWORD,
        },
      },
      defaults: {
        from: `"Elmam" <${process.env.NODEMAILER_MAIL}>`,
      },
    }),
    AuthModule,
    UsersModule,
    StudiesModule,
    NotificationsModule,
    MessagesModule,
    EmailsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
