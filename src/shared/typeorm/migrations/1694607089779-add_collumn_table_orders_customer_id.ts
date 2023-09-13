import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class addCollumnTableOrdersCustomerId1694607089779 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.addColumn(
      'orders',
      new TableColumn({
        name: 'customerId',
        type: 'serial',
        isNullable: false,
      })
    )
    await queryRunner.createForeignKey(
      'orders',
      new TableForeignKey({
        name: 'FK_ORDERS_CUSTOMER',
        columnNames: ['customerId'],
        referencedTableName: 'customers',
        referencedColumnNames: ['id'],

      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('orders', 'FK_ORDERS_CUSTOMER'),
    await queryRunner.dropColumn('orders', 'customerId')

  }

}
