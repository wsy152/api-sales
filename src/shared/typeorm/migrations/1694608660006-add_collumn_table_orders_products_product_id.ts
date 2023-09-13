import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class addCollumnTableOrdersProductsProductId1694608660006 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn(
        'orders_products',
        new TableColumn({
          name: 'productId',
          type: 'serial',
          isNullable: false,
        })
      )
      await queryRunner.createForeignKey(
        'orders_products',
        new TableForeignKey({
          name: 'FK_ORDERS_PRODUCTS_PRODUCT',
          columnNames: ['productId'],
          referencedTableName: 'products',
          referencedColumnNames: ['id'],

        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('orders_products', 'FK_ORDERS_PRODUCTS_PRODUCT'),
        await queryRunner.dropColumn('orders_products', 'productId')
    }

}
