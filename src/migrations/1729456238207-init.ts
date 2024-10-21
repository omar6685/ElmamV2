import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1729456238207 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          ALTER TABLE users DROP CONSTRAINT IF EXISTS "PK_c525e9373d63035b9919e578a9c";
          ALTER TABLE notifications DROP CONSTRAINT IF EXISTS "PK_c525e9373d63035b9919e578a9c";
          ALTER TABLE notification_tokens DROP CONSTRAINT IF EXISTS "PK_c525e9373d63035b9919e578a9c";
          ALTER TABLE roles DROP CONSTRAINT IF EXISTS "PK_c525e9373d63035b9919e578a9c";
          ALTER TABLE archive_records DROP CONSTRAINT IF EXISTS "PK_c525e9373d63035b9919e578a9c";
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
