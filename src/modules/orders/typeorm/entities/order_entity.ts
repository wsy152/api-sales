import CustumerEntity from '@modules/customers/typeorm/entities/customer_entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import OrdersProductsEntity from './orders_products_entity';


@Entity('orders')
class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(()=> CustumerEntity)
  @JoinColumn({name:'customerId'})
  customer: CustumerEntity

  @OneToMany(() => OrdersProductsEntity, orderProducts => orderProducts.order,{cascade: true})
  orderProducts: OrdersProductsEntity[]




  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  active: boolean;
}

export default OrderEntity;
