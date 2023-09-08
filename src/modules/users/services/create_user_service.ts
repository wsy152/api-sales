import AppError from "@shared/errors/app_error";
import { getCustomRepository } from "typeorm";

import UsersEntity from "../typeorm/entities/users_entity";
import { UsersRepository } from "../typeorm/repositories/users_repository";



interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserSercice {
  public async execute({ name, email, password }: IRequest): Promise<UsersEntity> {

    const usersRepository = getCustomRepository(UsersRepository);

    const emailExists = await usersRepository.findbyEmail(email);

    if (emailExists) {
      throw new AppError('There is already one user with this email');
    }

    const user = usersRepository.create({
      name,
      email,
      password,
    });

    await usersRepository.save(user);

    return user;

  }
}
export default CreateUserSercice;
