import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class addCollumnTableOrdersProductsOrdersId1694608193822 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'orders_products',
      new TableColumn({
        name: 'orderId',
        type: 'serial',
        isNullable: false,
      })
    )
    await queryRunner.createForeignKey(
      'orders_products',
      new TableForeignKey({
        name: 'FK_ORDERS_PRODUCTS_ORDER',
        columnNames: ['orderId'],
        referencedTableName: 'orders',
        referencedColumnNames: ['id'],

      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('orders_products', 'FK_ORDERS_PRODUCTS_ORDER'),
    await queryRunner.dropColumn('orders_products', 'orderId')
  }

}
