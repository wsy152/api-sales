import { EntityRepository, Repository } from "typeorm";

import CustumerEntity from "../entities/customer_entity";

@EntityRepository(CustumerEntity)
export class CustumerRepository extends Repository<CustumerEntity> {

  public async findbyName(name: string): Promise<CustumerEntity | undefined> {
    const cutumoer = this.findOne({
      where: {
        name,
      },
    });
    return cutumoer;
  }



  public async findbyId(id: string): Promise<CustumerEntity | undefined> {
    const cutumoer = this.findOne({
      where: {
        id,
      },
    });
    return cutumoer;
  }

  public async findbyEmail(email: string): Promise<CustumerEntity | undefined> {
    const cutumoer = this.findOne({
      where: {
        email,
      },
    });
    return cutumoer;
  }
}
