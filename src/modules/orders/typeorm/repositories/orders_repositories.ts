import { EntityRepository, Repository } from "typeorm";
import OrderEntity from "../entities/order_entity";
import CustumerEntity from "@modules/customers/typeorm/entities/customer_entity";


interface IProduct{
  productId: string;
  price: number;
  quantity: number;
}

interface IRequest {
  customer: CustumerEntity
  products: IProduct[]
}


@EntityRepository(OrderEntity)
export class OrdersRepository extends Repository<OrderEntity> {

  public async findbyId(id: string): Promise<OrderEntity | undefined> {
    const order = await this.createQueryBuilder("order")
      .select([
        "order.id",
        "order.updated_at",
        "order.active",
        "customer.id",
        "customer.name",
        "customer.email",
        "customer.active",
        "orderProducts.id",
        "orderProducts.price",
        "orderProducts.quantity",
        "orderProducts.orderId",
        "orderProducts.productId",
        "orderProducts.active",
      ])
      .leftJoinAndSelect("order.orderProducts", "orderProducts")
      .leftJoin("order.customer", "customer")
      .where("order.id = :id", { id })
      .getOne();

    return order;
  }



  public async createOrder({ customer, products }: IRequest): Promise<OrderEntity> {
    const order = this.create({
      customer,
      orderProducts: products
    });
    await this.save(order);

    return order;
  }
}
