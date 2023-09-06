import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/producty_repository";
import ProductsEntity from "../typeorm/entities/products_entity";


export class ListProductSercice {
  public async execute(): Promise<ProductsEntity[]> {

    const productsRepository = getCustomRepository(ProductRepository);

    const products = await productsRepository.find();

    return products;

  }
}
