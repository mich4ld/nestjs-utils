import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const Cookies = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    if (!request.cookies) {
      return;
    }

    return data ? request.cookies[data] : request.cookies;
  }
)
