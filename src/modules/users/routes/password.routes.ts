import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UsersController from '../controllers/users_controller';
import ForgotPasswordController from '../controllers/forgot_password_controller';
import ResetPasswordController from '../controllers/reset_password_controller';


const passwordRouter = Router();

const forgotPasswordController = new ForgotPasswordController();

const resetPasswordController = new ResetPasswordController()

passwordRouter.post('/forgot', celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required()

  },
}),
  forgotPasswordController.create,
);

passwordRouter.post('/reset', celebrate({
  [Segments.BODY]: {
    token: Joi.string().uuid().required(),
    password: Joi.string().required(),
    passwordConfimation: Joi.string().required().valid(Joi.ref('password')),
  },
}),
  resetPasswordController.create,
);



export default passwordRouter;
