import AppError from "@shared/errors/app_error";
import { getCustomRepository } from "typeorm";
import {isAfter,addHours} from 'date-fns';
import {hash} from 'bcryptjs';

import { UsersRepository } from "../typeorm/repositories/users_repository";
import { UserTokenRepository } from "../typeorm/repositories/user_token_repository";




interface IRequest {
  token: string;
  password: string;

}

class ResetForgotPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const userTokenRepository = getCustomRepository(UserTokenRepository);

    const usersRepository = getCustomRepository(UsersRepository);


    const userToken = await userTokenRepository.findbyToken(token);

    if (!userToken) {
      throw new AppError('User Token does not exists');
    }

    const user = await usersRepository.findbyId(userToken.userId.toString());

    if(!user){
      throw new AppError('User does not exists');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt,2);

    if(isAfter(Date.now(),compareDate)){
      throw new AppError ('Token Expired');
    }

    user.password = await hash(password,8);

    console.log(token);

  }
}
export default ResetForgotPasswordService;
