import { EntityRepository, Repository } from "typeorm";
import UsersEntity from "../entities/users_entity";



@EntityRepository(UsersEntity)
export class UsersRepository extends Repository<UsersEntity> {

  public async findbyName(name: string): Promise<UsersEntity | undefined> {
    const user = this.findOne({
      where: {
        name,
      },
    });
    return user;
  }

  public async findbyId(id: string): Promise<UsersEntity | undefined> {
    const user = this.findOne({
      where: {
        id,
      },
    });
    return user;
  }

  public async findbyEmail(email: string): Promise<UsersEntity | undefined> {
    const user = this.findOne({
      where: {
        email,
      },
    });
    return user;
  }
}
