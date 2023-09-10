import {Request,Response} from 'express';
import CreateSessionsSercice from '../services/create_sessions_service';


export default class SessionsController {
  public async create(req: Request, resp: Response): Promise<Response>{
    const {email, password} = req.body;

    const createSession = new CreateSessionsSercice();

    const user = await createSession.execute({
      email,
      password

    });

    return resp.json(user);

  }
}
