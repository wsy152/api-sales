import { Request, Response } from "express";
import { ListUserSercice } from "../services/list_user_service";
import CreateUserSercice from "../services/create_user_service";
import { UpdateUserSercice } from "../services/update_product_service";
import { ShowUserSercice } from "../services/show_user_service";
import { DeleteUserSercice } from "../services/delete_user_service";
import UpdateUserAvatarSercice from "../services/update_user_avatar_service";

export default class UserAvatarController {


  public async update(req: Request, res: Response): Promise<Response> {

    const updateAvatar = new UpdateUserAvatarSercice();

    const user = updateAvatar.execute({
      userId: req.user.id,
      avatarFileName: req.file!.filename,
    });

    return res.json(user);
  }


}
