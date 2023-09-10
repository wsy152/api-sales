import productsRouter from "@modules/products/routes/products_routes";
import sessionsRouter from "@modules/users/routes/sessions.routes";
import usersRouter from "@modules/users/routes/user.routes";
import { Router } from "express";


export const routes = Router();

routes.use('/products',productsRouter);

routes.use('/users', usersRouter);

routes.use('/sessions',sessionsRouter);


export default routes
