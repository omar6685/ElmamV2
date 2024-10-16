import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { APP_GUARD } from '@nestjs/core';
import { config } from 'dotenv';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { Role, UserRole } from './auth/entities/role.entity';
import { RolesGuard } from './shared/guards/roles.guard';
import { StudiesModule } from './studies/studies.module';
import { NotificationsModule } from './notifications/notifications.module';
import { MessagesModule } from './messages/messages.module';
import { Notification } from './notifications/entities/notification.entity';
import { Message } from './messages/entities/message.entity';
import { NotificationToken } from './notifications/entities/notification-token.entity';

config();

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
        UserRole,
        Role,
        Notification,
        NotificationToken,
        Message,
      ],
      // migrations: ['src/migrations/**/*{.ts,.js}'],
      // migrationsTableName: 'custom_migration_table',
      synchronize: process.env.NODE_ENV === 'development', // only synchronize in development mode
    }),
    AuthModule,
    UsersModule,
    StudiesModule,
    NotificationsModule,
    MessagesModule,
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
