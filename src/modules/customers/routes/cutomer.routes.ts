import { Router } from "express";
import { celebrate, Joi, Segments } from 'celebrate';
import CustumersController from "../controllers/cutomers_controller";
import isAuthenticaticated from "@shared/http/middlewares/is_authenticated";


const cutumersRouter = Router();

const cutumersController = new CustumersController();

cutumersRouter.use(isAuthenticaticated);

cutumersRouter.get('/', cutumersController.index);

cutumersRouter.get('/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    }
  }), cutumersController.show);

cutumersRouter.post('/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
    }
  }), cutumersController.create);

cutumersRouter.put('/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),

    },
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    }
  }), cutumersController.update);

cutumersRouter.delete('/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    }
  }), cutumersController.delete);

export default cutumersRouter;
