import { Request, Response } from "express";
import { ListUserSercice } from "../services/list_user_service";
import CreateUserSercice from "../services/create_user_service";

export default class UsersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listUser = new ListUserSercice();

    const users = await listUser.execute();

    return res.json(users);

  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    const createUser = new CreateUserSercice();

    const user = await createUser.execute({
      name,
      email,
      password,
    });
    return res.json(user);
  }
}
