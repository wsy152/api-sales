import { Request, Response } from "express";
import { ListUserSercice } from "../services/list_user_service";
import CreateUserSercice from "../services/create_user_service";
import { UpdateUserSercice } from "../services/update_user_service";
import { ShowUserSercice } from "../services/show_user_service";
import { DeleteUserSercice } from "../services/delete_user_service";

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

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showUser = new ShowUserSercice();

    const user = await showUser.execute({ id });

    return res.json(user);

  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;
    const { id } = req.params;

    const updateUser = new UpdateUserSercice();

    const user = await updateUser.execute({
      id,
      name,
      email,
      password,
    });

    return res.json(user);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deleteUser = new DeleteUserSercice();

    await deleteUser.execute({ id });

    return res.json([]);

  }

}
