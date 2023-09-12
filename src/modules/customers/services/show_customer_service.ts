import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/app_error";
import CustumerEntity from "../typeorm/entities/customer_entity";
import { CustumerRepository } from "../typeorm/repositories/cutomers_repository";



interface IRequest {
  id: string;

}


export class ShowCutomerSercice {
  public async execute({ id }: IRequest): Promise<CustumerEntity> {

    const customerRepository = getCustomRepository(CustumerRepository);

    const custumer = await customerRepository.findbyId(id);

    if (!custumer) {
      throw new AppError('Cutomer is not found');
    }

    return custumer;

  }
}
