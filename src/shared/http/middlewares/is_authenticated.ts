import AppError from "@shared/errors/app_error";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import authConfig from '@config/auth';


interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;

}

export default function isAuthenticaticated(req: Request, resp: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is missing.');

  }

  const [, token] = authHeader.split(' ');

  try {

    const decodedToken = verify(token, authConfig.jwt.secret);

    const { sub } = decodedToken as TokenPayload;

    req.user = {
      id: sub,
    }

    return next();

  } catch (error) {

    throw new AppError('Ivalid jwt Invalid');

  }

}
