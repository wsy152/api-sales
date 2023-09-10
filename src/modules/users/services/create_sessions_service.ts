import AppError from "@shared/errors/app_error";
import { getCustomRepository } from "typeorm";
import { sign, Secret } from 'jsonwebtoken';
import authConfig from '@config/auth';
import UsersEntity from "../typeorm/entities/users_entity";
import { UsersRepository } from "../typeorm/repositories/users_repository";
import { compare, hash } from "bcryptjs";




interface IRequest {
  email: string;
  password: string;
}

interface IResponse {

  user: UsersEntity;
  token: string;

}

class CreateSessionsSercice {
  public async execute({ email, password }: IRequest): Promise<IResponse> {

    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findbyEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password',401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password', 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: String(user.id),
      expiresIn: authConfig.jwt.expiresIn,
    });



    return {
      user,
      token,
    }

  }
}
export default CreateSessionsSercice;
