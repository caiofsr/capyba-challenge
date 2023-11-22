import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class GetUserId implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  use(req: Request, res: Response, next: (error?: any) => void) {
    const token = req.headers['authorization'];

    const tokenInfo = this.jwtService.decode(token.split(' ').at(1));

    req.body.userId = tokenInfo.sub;

    next();
  }
}
