const { MigrationInterface, QueryRunner } = require('typeorm')

module.exports = class CreateAudit1703818245874 {
  name = 'CreateAudit1703818245874'

  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE \`audit\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`requestUrl\` varchar(255) NOT NULL, \`userId\` bigint UNSIGNED NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `ALTER TABLE \`audit\` ADD CONSTRAINT \`FK_7ae389e858ad6f2c0c63112e387\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  async down(queryRunner) {
    await queryRunner.query(`ALTER TABLE \`audit\` DROP FOREIGN KEY \`FK_7ae389e858ad6f2c0c63112e387\``)
    await queryRunner.query(`DROP TABLE \`audit\``)
  }
}
