import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import OrderEntity from './order_entity';
import ProductsEntity from '@modules/products/typeorm/entities/products_entity';


@Entity('orders_products')
class OrdersProductsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal')
  price: number;

  @Column('decimal')
  quantity: number;

  @ManyToOne(() => OrderEntity, order => order.orderProducts)
  @JoinColumn({ name: 'ordersId' })
  order: OrderEntity

  @ManyToOne(() => ProductsEntity, product => product.orderProducts)
  @JoinColumn({ name: 'productId' })
  product: OrderEntity

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  active: boolean;
}

export default OrdersProductsEntity;
