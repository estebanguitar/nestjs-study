const { MigrationInterface, QueryRunner } = require('typeorm')

module.exports = class AddUserEmailColumn1704703131708 {
  name = 'AddUserEmailColumn1704703131708'

  async up(queryRunner) {
    await queryRunner.query(`ALTER TABLE \`user\` ADD \`email\` varchar(100) NOT NULL`)
    await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`)`)
    await queryRunner.query(`ALTER TABLE \`user\` ADD \`twoFactorAuthSecret\` varchar(255) NULL`)
  }

  async down(queryRunner) {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`twoFactorAuthSecret\``)
    await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\``)
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`email\``)
  }
}
