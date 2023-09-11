import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UsersController from '../controllers/users_controller';
import ForgotPasswordController from '../controllers/forgot_password_controller';


const passwordRouter = Router();

const forgotPasswordController = new ForgotPasswordController();

passwordRouter.post('/forgot', celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required()

  },
}),
  forgotPasswordController.create,
);


export default passwordRouter;
