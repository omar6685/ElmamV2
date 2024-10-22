import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1729546221132 implements MigrationInterface {
  name = 'Init1729546221132';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX IF EXISTS "PK_c525e9373d63035b9919e578a9c";`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
