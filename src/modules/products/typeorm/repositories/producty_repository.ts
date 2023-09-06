import { EntityRepository, Repository } from "typeorm";


import Products from "../entities/products_entity";

@EntityRepository(Products)
export class ProductRepository extends Repository<Products> {

  public async findbyName(name: string): Promise<Products | undefined> {
    const product = this.findOne({
      where: {
        name,
      },
    });
    return product;
  }
}
