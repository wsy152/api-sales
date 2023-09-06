import { EntityRepository, Repository } from "typeorm";

import ProductsEntity from "../entities/products_entity";

@EntityRepository(ProductsEntity)
export class ProductRepository extends Repository<ProductsEntity> {

  public async findbyName(name: string): Promise<ProductsEntity | undefined> {
    const product = this.findOne({
      where: {
        name,
      },
    });
    return product;
  }
}
