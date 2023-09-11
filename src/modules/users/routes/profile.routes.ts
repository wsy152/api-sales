import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import isAuthenticaticated from '../../../shared/http/middlewares/is_authenticated';
import ProfileController from '../controllers/profile_controller';

const profileRouter = Router();

const profileController = new ProfileController();

profileRouter.use(isAuthenticaticated);

profileRouter.get('/', profileController.show);

profileRouter.put('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    oldPassword: Joi.string(),
    password: Joi.string().optional(),
    passwordConfirmation: Joi.string()
        .valid(Joi.ref('password'))
        .when('password', {
          is: Joi.exist(),
          then: Joi.required()
        })
  },
}),
  profileController.update,
);

export default profileRouter;
