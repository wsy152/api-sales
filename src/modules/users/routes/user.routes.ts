import {Router} from 'express';
import {celebrate, Joi,Segments} from 'celebrate';
import UsersController from '../controllers/users_controller';


const usersRouter = Router();

const usersController = new UsersController();
