import { getCustomRepository } from "typeorm";
import OrderEntity from "../typeorm/entities/order_entity";
import { OrdersRepository } from "../typeorm/repositories/orders_repositories";

export class ListOrderService {
  public async execute(): Promise<OrderEntity[]> {
    const ordersRepository = getCustomRepository(OrdersRepository);

    const orders = await ordersRepository
      .createQueryBuilder('order')
      .select([
        'order.id',
        'order.updated_at',
        'order.active',
        'customer.id',
        'customer.name',
        'customer.email',
        'customer.active',
        'orderProducts.id',
        'orderProducts.price',
        'orderProducts.quantity',
        'orderProducts.orderId',
        'orderProducts.productId',
        'orderProducts.active',
      ])
      .leftJoin('order.customer', 'customer')
      .leftJoinAndSelect('order.orderProducts', 'orderProducts')
      .getMany();

    return orders;
  }
}

