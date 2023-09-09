import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/app_error";
import { UsersRepository } from "../typeorm/repositories/users_repository";


interface IRequest {
  id: string;

}


export class DeleteUserSercice {
  public async execute({ id }: IRequest): Promise<void> {

    const userRepository = getCustomRepository(UsersRepository);

    const user = await userRepository.findOne(id);

    if (!user) {
      throw new AppError('Product is not found');
    }
    userRepository.remove(user);

  }
}
