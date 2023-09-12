import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/app_error";
import CustumerEntity from "../typeorm/entities/customer_entity";
import { CustumerRepository } from "../typeorm/repositories/cutomers_repository";

interface IRequest {
  id: string;
  name: string;
  email: string;

}

export default class UpdateCutomerSercice {
  public async execute({ id, name, email }: IRequest): Promise<CustumerEntity> {

    const customerRepository = getCustomRepository(CustumerRepository);

    const customer = await customerRepository.findOne(id);

    if (!customer) {
      throw new AppError('Customer is not found');
    }
    const userUpdateEmail = await customerRepository.findbyEmail(email);

    if (userUpdateEmail && userUpdateEmail.id === parseInt(id)) {
      throw new AppError('There is already one customer with this email');
    }

    customer.name = name;
    customer.email = email;

    await customerRepository.save(customer);

    return customer;

  }
}
