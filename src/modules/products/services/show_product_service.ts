import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../repositories/producty_repository";
import ProductsEntity from "../entities/products_entity";
import AppError from "@shared/errors/app_error";


interface IRequest {
  id: string;

}


export class ShowProductSercice {
  public async execute({id}:IRequest): Promise<ProductsEntity> {

    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);

    if(!product){
      throw new AppError('Product is not found');
    }

    return product;

  }
}
