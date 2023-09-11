import AppError from "@shared/errors/app_error";
import { getCustomRepository } from "typeorm";

import { UsersRepository } from "../typeorm/repositories/users_repository";
import { UserTokenRepository } from "../typeorm/repositories/user_token_repository";
import EherealMail from "@config/mail/ethereal_mail";





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


    await EherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email
      },
      subject: 'API Vendas - Recuperação de senha',
      templateData: {
        template: `Ola {{name}}: {{token}}`,
        variables: {
          name: user.name,
          token,
        }
      }

    })

  }
}
export default SendForgotPasswordService;
