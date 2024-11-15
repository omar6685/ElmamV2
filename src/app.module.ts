import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { APP_GUARD } from '@nestjs/core';
import { MailerModule } from '@nestjs-modules/mailer';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesGuard } from './shared/guards/roles.guard';
import { StudiesModule } from './studies/studies.module';
import { NotificationsModule } from './notifications/notifications.module';
import { MessagesModule } from './messages/messages.module';
import { EmailsModule } from './emails/emails.module';
import { dbDataSourceOptions } from '../config/data-source.config';
import { mailerOptions } from '../config/mailer-options.config';
import { ProductsModule } from './products/products.module';
import { EntitiesModule } from './entities/entities.module';
import { CrnsModule } from './crns/crns.module';
import { ActivitiesModule } from './activities/activities.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dbDataSourceOptions),
    MailerModule.forRoot(mailerOptions),
    ScheduleModule.forRoot(),
    HttpModule,
    AuthModule,
    UsersModule,
    StudiesModule,
    NotificationsModule,
    MessagesModule,
    EmailsModule,
    ProductsModule,
    CrnsModule,
    EntitiesModule,
    ActivitiesModule,
    ReportsModule,
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
