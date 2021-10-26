import { BadRequestException, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from 'express';
import { FastifyRequest } from 'fastify';

const JSON_MIME = ['application/json'];

@Injectable()
export class JsonGuard implements CanActivate {
  canActivate(ctx: ExecutionContext) {
    const req = ctx.switchToHttp().getRequest<Request | FastifyRequest>();
    const contentType = req.headers['content-type'];
    if (!JSON_MIME.includes(contentType)) {
      throw new BadRequestException('Only JSON body is accepted');
    }

    return true;
  }
}

