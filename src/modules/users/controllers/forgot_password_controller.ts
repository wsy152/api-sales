import { Request, Response } from "express";
import SendForgotPasswordService from "../services/send_forgot_password_service";


export default class ForgotPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const sendForgotPasswordEmail = new SendForgotPasswordService();

    await sendForgotPasswordEmail.execute({

      email,

    });
    return res.status(204).json();
  }

}
