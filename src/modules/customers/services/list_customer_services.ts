import { getCustomRepository } from "typeorm";
import CustumerEntity from "../typeorm/entities/customer_entity";
import { CustumerRepository } from "../typeorm/repositories/cutomers_repository";



export class ListCustomerSercice {
  public async execute(): Promise<CustumerEntity[]> {

    const cutomersRepository = getCustomRepository(CustumerRepository);

    const customers = await cutomersRepository.find();

    return customers;

  }
}
