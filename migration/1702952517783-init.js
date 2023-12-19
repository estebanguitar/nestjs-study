const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Init1702952517783 {
    name = 'Init1702952517783'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`reply\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`boardId\` bigint UNSIGNED NOT NULL, \`userId\` bigint UNSIGNED NOT NULL, \`content\` varchar(2000) NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NULL, \`deletedAt\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`board\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`title\` varchar(100) NOT NULL, \`content\` varchar(5000) NOT NULL, \`user_id\` bigint UNSIGNED NOT NULL, \`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` datetime NULL, \`deleted_at\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`username\` varchar(100) NOT NULL, \`password\` varchar(200) NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`deletedAt\` datetime NULL, UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`reply\` ADD CONSTRAINT \`FK_34d08b0d948a9b12f712de60886\` FOREIGN KEY (\`boardId\`) REFERENCES \`board\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reply\` ADD CONSTRAINT \`FK_e9886d6d04a19413a2f0aac5d7b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`board\` ADD CONSTRAINT \`FK_b157cf902abe253a55961e8920b\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`board\` DROP FOREIGN KEY \`FK_b157cf902abe253a55961e8920b\``);
        await queryRunner.query(`ALTER TABLE \`reply\` DROP FOREIGN KEY \`FK_e9886d6d04a19413a2f0aac5d7b\``);
        await queryRunner.query(`ALTER TABLE \`reply\` DROP FOREIGN KEY \`FK_34d08b0d948a9b12f712de60886\``);
        await queryRunner.query(`DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`board\``);
        await queryRunner.query(`DROP TABLE \`reply\``);
    }
}
