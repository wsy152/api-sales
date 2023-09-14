import { EntityRepository, Repository,In } from "typeorm";


import Products from "../entities/products_entity";


interface IFindProducts {
  id: string;

}

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

  public async findAllIds(products: IFindProducts[]): Promise<Products[]> {
    const productIds = products.map(product => product.id);

    const existsProduts = await this.find({
      where:{
        id: In(productIds),

      }

    })
    return existsProduts;
  }
}
