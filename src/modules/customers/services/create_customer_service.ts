import AppError from "@shared/errors/app_error";
import { getCustomRepository } from "typeorm";
import { CustumerRepository } from "../typeorm/repositories/cutomers_repository";
import CustumerEntity from "../typeorm/entities/customer_entity";



interface IRequest {
  name: string;
  email: string;

}

class CreateCutomerSercice {
  public async execute({ name, email }: IRequest): Promise<CustumerEntity> {

    const cutomerRepository = getCustomRepository(CustumerRepository);

    const emailExists = await cutomerRepository.findbyEmail(email);

    if (emailExists) {
      throw new AppError('There is already one customer with this email');
    }

    const cutomer = cutomerRepository.create({
      name,
      email,

    });

    await cutomerRepository.save(cutomer);

    return cutomer;

  }
}
export default CreateCutomerSercice;
