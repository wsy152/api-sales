import OrdersProductsEntity from '@modules/orders/typeorm/entities/orders_products_entity';
import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';


@Entity('products')
class ProductsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name:string;

  @Column('decimal')
  price: number;

  @OneToMany(() => OrdersProductsEntity, orderProducts => orderProducts.product)
  orderProducts: OrdersProductsEntity[]

  @Column('decimal')
  quantity: number;

  @CreateDateColumn()
  created_at:Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  active: boolean;
}

export default ProductsEntity;
