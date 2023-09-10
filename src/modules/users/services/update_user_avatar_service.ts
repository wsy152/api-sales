import AppError from "@shared/errors/app_error";
import { getCustomRepository } from "typeorm";
import path from "path";

import UsersEntity from "../typeorm/entities/users_entity";
import { UsersRepository } from "../typeorm/repositories/users_repository";
import uploadConfig from '@config/upload';
import fs from 'fs';





interface IRequest {
  userId: string;
  avatarFileName: string;
}

class UpdateUserAvatarSercice {
  public async execute({ userId, avatarFileName }: IRequest): Promise<UsersEntity> {

    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findbyId(userId);


    if (!user) {
      throw new AppError('User not found.');

    }

    if (user.avatar) {
      const userAvatarFilerPath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFilerExists = await fs.promises.stat(userAvatarFilerPath);

      if (userAvatarFilerExists) {
        await fs.promises.unlink(userAvatarFilerPath);
      }
    }
    user.avatar = avatarFileName;

    await usersRepository.save(user);

    return user;



  }
}
export default UpdateUserAvatarSercice;
