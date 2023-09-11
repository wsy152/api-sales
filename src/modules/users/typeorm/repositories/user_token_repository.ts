import { EntityRepository, Repository } from "typeorm";
import UsersEntity from "../entities/users_entity";
import UserTokenEntity from "../entities/user_token_entity";



@EntityRepository(UserTokenEntity)
export class UserTokenRepository extends Repository<UserTokenEntity> {

  public async findbyToken(token: string): Promise<UserTokenEntity | undefined> {
    const userToken = await this.findOne({
      where: {
        token,
      },
    });
    return userToken;
  }

  public async generateToken(userId: number): Promise<UserTokenEntity | undefined> {
    const userToken = await this.findOne({
      where: {
        userId,
      },
    });

    if (userToken) {
      await this.save(userToken);
    }
    return userToken;
  }
}
