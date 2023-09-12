import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createTableCustomers1694528645608 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table(
          {
            name: 'customers',
            columns: [
              {
                name: 'id',
                type: 'serial',
                isPrimary: true,
              },
              {
                name: 'name',
                type: 'varchar',
              },
              {
                name: 'email',
                type: 'varchar',
                isUnique: true,
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

            ]
          })
      )

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('customers');
    }

}
