import productsRouter from "@modules/products/routes/products_routes";
import { Router } from "express";


export const routes = Router();

routes.use('/products',productsRouter);


export default routes
