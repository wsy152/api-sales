import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';


@Entity('products')
class ProductsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name:string;

  @Column('decimal')
  price: number;

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
