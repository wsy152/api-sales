import { getCustomRepository } from "typeorm";
import UsersEntity from "../typeorm/entities/users_entity";
import { UsersRepository } from "../typeorm/repositories/users_repository";


export class ListUserSercice {
  public async execute(): Promise<UsersEntity[]> {

    const usersRepository = getCustomRepository(UsersRepository);

    const users = await usersRepository.find();

    return users;

  }
}
