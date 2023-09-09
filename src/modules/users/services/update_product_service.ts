import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/app_error";
import UsersEntity from "../typeorm/entities/users_entity";
import { UsersRepository } from "../typeorm/repositories/users_repository";


interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
}


export class UpdateUserSercice {
  public async execute({ id, name, email, password }: IRequest): Promise<UsersEntity> {

    const userRepository = getCustomRepository(UsersRepository);

    const user = await userRepository.findOne(id);

    if (!user) {
      throw new AppError('Product is not found');
    }
    const userExists = await userRepository.findbyName(name);

    if (userExists && name != user.name) {
      throw new AppError('There is already one product with this name');
    }

    user.name = name;
    user.email = email;
    user.password = password;

    await userRepository.save(user);

    return user;

  }
}
