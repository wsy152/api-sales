import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createTableUserTokens1694378567619 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table(
        {
          name: 'user_token',
          columns: [
            {
              name: 'id',
              type: 'serial',
              isPrimary: true,
            },
            {
              name: 'token',
              type: 'uuid',
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()'
            },
            {
              name: 'userId',
              type: 'int',
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: 'now()',
            },
            {
              name: 'updated_at',
              type: 'timestamp',
              default: 'now()',
            },
            {
              name: 'active',
              type: 'boolean',
              default: true,
            },

          ],
          foreignKeys:[
            {
              name: 'TokenUser',
              referencedTableName: 'users',
              referencedColumnNames: ['id'],
              columnNames: ['userId'],
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE',
            }
          ]
        })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_token')
  }

}
