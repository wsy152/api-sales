import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/app_error";
import { CustumerRepository } from "../typeorm/repositories/cutomers_repository";



interface IRequest {
  id: string;

}

export class DeleteCutomerSercice {
  public async execute({ id }: IRequest): Promise<void> {

    const customerRepository = getCustomRepository(CustumerRepository);

    const customer = await customerRepository.findOne(id);

    if (!customer) {
      throw new AppError('Customer is not found');
    }
    customerRepository.remove(customer);
  }
}
