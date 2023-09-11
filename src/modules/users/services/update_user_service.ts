import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/app_error";
import UsersEntity from "../typeorm/entities/users_entity";
import { UsersRepository } from "../typeorm/repositories/users_repository";
import{compare,hash} from 'bcryptjs';



interface IRequest {
  id: string;
  name: string;
  email: string;
  password?: string;
  oldPassword?: string
}


export default class UpdateUserSercice {
  public async execute({ id, name, email, password, oldPassword }: IRequest): Promise<UsersEntity> {

    const userRepository = getCustomRepository(UsersRepository);

    const user = await userRepository.findOne(id);

    if (!user) {
      throw new AppError('User is not found');
    }
    const userUpdateEmail = await userRepository.findbyEmail(email);

    if (userUpdateEmail && userUpdateEmail.id === parseInt(id)){
      throw new AppError('There is already one user with this email');
    }

    if(password && !oldPassword){
      throw new AppError('Old password is required.');
    }

    if(password && oldPassword){
      const checkOldPassword = await compare(oldPassword,password);

      if(!checkOldPassword){
        throw new AppError('Old password does not match.');
      }
      user.password = await hash(password, 8);
    }

    // if (userUpdateEmail && name != user.name) {
    //   throw new AppError('There is already one product with this name');
    // }

    user.name = name;
    user.email = email;


    await userRepository.save(user);

    return user;

  }
}
