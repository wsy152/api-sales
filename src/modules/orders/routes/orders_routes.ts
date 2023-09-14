import { Router } from "express";
import {celebrate,Joi, Segments} from 'celebrate';
import OrdersController from "../controllers/orders_controller";


const ordersRouter = Router();

const ordersController = new OrdersController();


ordersRouter.get('/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    }
  }), ordersController.show);

ordersRouter.post('/',
  celebrate({
    [Segments.BODY]: {
      customerId: Joi.number().required(),
      products: Joi.required()
    }
  }), ordersController.create);



export default ordersRouter;
