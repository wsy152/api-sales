import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';


@Entity('orders')
class CustumerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(()=> CustumerEntity)
  @JoinColumn({name:'customerId'})
  customer: CustumerEntity

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  active: boolean;
}

export default CustumerEntity;
