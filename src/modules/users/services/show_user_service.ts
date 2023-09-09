import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/app_error";
import UsersEntity from "../typeorm/entities/users_entity";
import { UsersRepository } from "../typeorm/repositories/users_repository";


interface IRequest {
  id: string;

}


export class ShowUserSercice {
  public async execute({ id }: IRequest): Promise<UsersEntity> {

    const userRepository = getCustomRepository(UsersRepository);

    const user = await userRepository.findOne(id);

    if (!user) {
      throw new AppError('Product is not found');
    }

    return user;

  }
}
