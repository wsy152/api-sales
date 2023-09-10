import AppError from "@shared/errors/app_error";
import { getCustomRepository } from "typeorm";

import UsersEntity from "../typeorm/entities/users_entity";
import { UsersRepository } from "../typeorm/repositories/users_repository";
import { compare, hash } from "bcryptjs";



interface IRequest {
  email: string;
  password: string;
}

// interface IResponse {

//   user: UsersEntity

// }

class CreateSessionsSercice {
  public async execute({ email, password }: IRequest): Promise<UsersEntity> {

    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findbyEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password',401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password', 401);
    }



    return user;

  }
}
export default CreateSessionsSercice;
