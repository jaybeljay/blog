import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableUsers1740681571450 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE users (
            id uuid NOT NULL DEFAULT uuid_generate_v4(),
            username varchar(255) NOT NULL UNIQUE,
            password varchar(255) NOT NULL,
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id))`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "users"');
  }
}
