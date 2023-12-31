import { Router } from "express";
import ProductsController from "../controllers/products_controller";
import {celebrate,Joi, Segments} from 'celebrate';


const productsRouter = Router();

const productsController = new ProductsController();


productsRouter.get('/', productsController.index);

productsRouter.get('/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    }
  }), productsController.show);

productsRouter.post('/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price:Joi.number().precision(2).required(),
      quantity: Joi.number().required()
    }
  }), productsController.create);

productsRouter.put('/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required()
    },
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    }
  }), productsController.update);

productsRouter.delete('/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    }
  }), productsController.delete);

export default productsRouter;
