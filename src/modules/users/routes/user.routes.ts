import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UsersController from '../controllers/users_controller';
import isAuthenticaticated from '../../../shared/http/middlewares/is_authenticated';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UserAvatarController from '../controllers/user_avatar_controller';



const usersRouter = Router();

const usersController = new UsersController();

const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig);


usersRouter.get('/', isAuthenticaticated, usersController.index);

usersRouter.post('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  },
}),
  usersController.create,
);

usersRouter.patch(
  '/avatar',
  isAuthenticaticated,
  upload.single('avatar'),
  userAvatarController.update,
)


export default usersRouter;
