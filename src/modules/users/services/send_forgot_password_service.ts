import AppError from "@shared/errors/app_error";
import { getCustomRepository } from "typeorm";

import { UsersRepository } from "../typeorm/repositories/users_repository";
import { UserTokenRepository } from "../typeorm/repositories/user_token_repository";
import EherealMail from "@config/mail/ethereal_mail";
import path from 'path';





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
    console.log(user);
    const {token} = await userTokenRepository.generateToken(user.id);

    console.log(token);

    const  forgotPasswordTemplete = path.resolve(__dirname,'..','views','forgot_password.hbs')


    await EherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email
      },
      subject: 'API Vendas - Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplete,
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset_password?token=${token}`,
        }
      }

    })

  }
}
export default SendForgotPasswordService;
