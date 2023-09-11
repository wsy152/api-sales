import { Request, Response } from "express";
import SendForgotPasswordService from "../services/send_forgot_password_service";
import ResetForgotPasswordService from "../services/reset_password_service";


export default class ResetPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { password,token } = req.body;

    const resetPassword = new ResetForgotPasswordService();

    await resetPassword.execute({
      password,
      token,
    });
    return res.status(204).json();
  }

}
