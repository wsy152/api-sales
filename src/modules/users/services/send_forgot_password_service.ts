import AppError from "@shared/errors/app_error";
import { getCustomRepository } from "typeorm";

import { UsersRepository } from "../typeorm/repositories/users_repository";
import { UserTokenRepository } from "../typeorm/repositories/user_token_repository";




interface IRequest {

  email: string;

}

class SendForgotPasswordService {
  public async execute({ email  }: IRequest): Promise<void> {

    const usersRepository = getCustomRepository(UsersRepository);

    const userTokenRepository = getCustomRepository(UserTokenRepository);

    const user = await usersRepository.findbyEmail(email);

    if(!user){
      throw new AppError('User does not exists');
    }
    const token = await userTokenRepository.generateToken(user.id);

    console.log(token);

  }
}
export default SendForgotPasswordService;
