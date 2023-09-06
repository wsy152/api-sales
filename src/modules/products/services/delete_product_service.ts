import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/producty_repository";
import AppError from "@shared/errors/app_error";


interface IRequest {
  id: string;

}


export class DeleteProductSercice {
  public async execute({ id }: IRequest): Promise<void> {

    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product is not found');
    }
    productsRepository.remove(product);



  }
}
