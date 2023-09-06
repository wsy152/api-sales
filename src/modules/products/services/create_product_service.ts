import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../repositories/producty_repository";
import AppError from "@shared/errors/app_error";
import ProductsEntity from "../entities/products_entity";

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

export class CreateProductSercice {
  public async execute({ name, price, quantity }: IRequest): Promise<ProductsEntity> {

    const productsRepository = getCustomRepository(ProductRepository);

    const productExists = await productsRepository.findbyName(name);

    if(productExists){
      throw new AppError('There is already one product with this name');
    }

    const product = productsRepository.create({
      name,
      price,
      quantity,
    });

    await productsRepository.save(product);

    return product;

  }
}
