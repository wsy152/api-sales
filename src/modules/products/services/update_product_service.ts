import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../repositories/producty_repository";
import ProductsEntity from "../entities/products_entity";
import AppError from "@shared/errors/app_error";


interface IRequest {
  id: string;
  name:string;
  price: number;
  quantity:number;
}


export class UpdateProductSercice {
  public async execute({ id,name,price,quantity }: IRequest): Promise<ProductsEntity > {

    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product is not found');
    }
    const productExists = await productsRepository.findbyName(name);

    if (productExists && name != product.name) {
      throw new AppError('There is already one product with this name');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productsRepository.save(product);

    return product;

  }
}
