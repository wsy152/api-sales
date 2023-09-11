import { Request, Response } from "express";



import { ShowUserSercice } from "../services/show_user_service";
import { DeleteUserSercice } from "../services/delete_user_service";
import UpdateUserSercice from "../services/update_user_service";

export default class ProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    const showProfiler = new ShowUserSercice();

    const user = await showProfiler.execute({ id: req.user.id });

    return res.json(user);

  }


  public async update(req: Request, res: Response): Promise<Response> {
    const { name, email, password,oldPassword } = req.body;
    const { id } = req.params;

    const updateUser = new UpdateUserSercice();

    const user = await updateUser.execute({
      id,
      name,
      email,
      password,
      oldPassword,
    });

    return res.json(user);
  }
}
