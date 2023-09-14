import AppError from "@shared/errors/app_error";
import { getCustomRepository } from "typeorm";
import OrderEntity from "../typeorm/entities/order_entity";
import { OrdersRepository } from "../typeorm/repositories/orders_repositories";

interface IRequest {
  id: string;

}

class ShowOrderSercice {
  public async execute({ id }: IRequest): Promise<OrderEntity> {

    const orderRepository = getCustomRepository(OrdersRepository);


    const order = await orderRepository.findbyId(id);

    if (!order) {
      throw new AppError('Order not found');
    }

    return order;
  }
}
export default ShowOrderSercice;
