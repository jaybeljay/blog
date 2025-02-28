import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablePosts1740724354368 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE posts (
            id uuid NOT NULL DEFAULT uuid_generate_v4(),
            title varchar(255) NOT NULL,
            description text NOT NULL,
            user_id uuid NOT NULL REFERENCES users (id) ON DELETE CASCADE,
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id))`);

    await queryRunner.query(
      `CREATE TRIGGER update_posts_updated_at_column BEFORE UPDATE ON posts FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "posts"');
  }
}
