const { MigrationInterface, QueryRunner } = require('typeorm')

module.exports = class Init1703041717217 {
  name = 'Init1703041717217'

  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`username\` varchar(100) NOT NULL, \`password\` varchar(200) NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`deletedAt\` datetime NULL, UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `CREATE TABLE \`reply\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`boardId\` bigint UNSIGNED NOT NULL, \`userId\` bigint UNSIGNED NOT NULL, \`content\` varchar(2000) NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NULL, \`deletedAt\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `CREATE TABLE \`board\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`title\` varchar(100) NOT NULL, \`content\` varchar(5000) NOT NULL, \`userId\` bigint UNSIGNED NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NULL, \`deletedAt\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `ALTER TABLE \`reply\` ADD CONSTRAINT \`FK_34d08b0d948a9b12f712de60886\` FOREIGN KEY (\`boardId\`) REFERENCES \`board\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE \`reply\` ADD CONSTRAINT \`FK_e9886d6d04a19413a2f0aac5d7b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE \`board\` ADD CONSTRAINT \`FK_c9951f13af7909d37c0e2aec484\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  async down(queryRunner) {
    await queryRunner.query(`ALTER TABLE \`board\` DROP FOREIGN KEY \`FK_c9951f13af7909d37c0e2aec484\``)
    await queryRunner.query(`ALTER TABLE \`reply\` DROP FOREIGN KEY \`FK_e9886d6d04a19413a2f0aac5d7b\``)
    await queryRunner.query(`ALTER TABLE \`reply\` DROP FOREIGN KEY \`FK_34d08b0d948a9b12f712de60886\``)
    await queryRunner.query(`DROP TABLE \`board\``)
    await queryRunner.query(`DROP TABLE \`reply\``)
    await queryRunner.query(`DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``)
    await queryRunner.query(`DROP TABLE \`user\``)
  }
}
