import AppError from "@shared/errors/app_error";
import { getCustomRepository } from "typeorm";
import OrderEntity from "../typeorm/entities/order_entity";
import { OrdersRepository } from "../typeorm/repositories/orders_repositories";
import { CustumerRepository } from "@modules/customers/typeorm/repositories/cutomers_repository";
import { ProductRepository } from "@modules/products/typeorm/repositories/producty_repository";


interface IProduct {
  id: string;
  quantity: number

}

interface IRequest {
  customerId: string;
 products: IProduct[]

}

class CreateOrderSercice {
  public async execute({ customerId, products }: IRequest): Promise<OrderEntity> {

    const ordersRepository = getCustomRepository(OrdersRepository);

    const customerRepositry = getCustomRepository(CustumerRepository);

    const productsRepository = getCustomRepository(ProductRepository);

    const customerExists = await customerRepositry.findbyId(customerId);

    if (!customerExists) {
      throw new AppError('Could not find any customer with the given id');
    }

    const existsProducts = await productsRepository.findAllIds(products);

    if(!existsProducts.length){
      throw new AppError('Could not find any products with the given ids');

    }

    const existsProductsIds = existsProducts.map((product)=> product.id);

    const checkInexistentProducts = products.filter(
      product => !existsProductsIds.includes(parseInt(product.id)),
    );

    if (checkInexistentProducts.length) {
      throw new AppError(`Could not find product ${checkInexistentProducts[0].id} with the given ids`);

    }

    const quantityAvailable = products.filter(
      product => existsProducts.filter(
        p =>  p.id === parseInt(product.id)
      )[0].quantity < product.quantity,
    );

    if (quantityAvailable.length) {
      throw new AppError(`The quantity  ${quantityAvailable[0].quantity} is Not`);

    }

    const serializedProducts = products.map(product => ({
      productId: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(p => p.id === parseInt(product.id))[0].price
    }));

    const order = await ordersRepository.createOrder({
      customer: customerExists,
      products: serializedProducts,
    });

    const {orderProducts } = order;

    const updatedProductQuantity = orderProducts.map(
      product => ({
        id: parseInt(product.productId),
        quantity: existsProducts.filter(p => p.id === product.id)[0].quantity - product.quantity
      })
    );

    await productsRepository.save(updatedProductQuantity);



    return order;



  }
}
export default CreateOrderSercice;
