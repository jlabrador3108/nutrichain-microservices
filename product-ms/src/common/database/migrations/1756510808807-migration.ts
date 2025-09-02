import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1756510808807 implements MigrationInterface {
    name = 'Migration1756510808807'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`price\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`price\` decimal NOT NULL`);
    }

}
