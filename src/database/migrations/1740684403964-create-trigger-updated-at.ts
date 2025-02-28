import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTriggerUpdatedAt1740684403964 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE OR REPLACE FUNCTION update_updated_at_column() RETURNS TRIGGER AS $$
    BEGIN
        NEW.updated_at = NOW();
        return NEW;
    END;
    $$ LANGUAGE plpgsql`);

    await queryRunner.query(
      `CREATE TRIGGER update_updated_at_column BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TRIGGER IF EXISTS update_updated_at_column`);
    await queryRunner.query(`DROP FUNCTION IF EXISTS update_updated_at_column`);
  }
}
