import { verify } from "jsonwebtoken";
import { env } from "../config/env";
import {
  IData,
  IMiddleware,
  IRequest,
  IResponse,
} from "../interfaces/IMiddleware";

export class AuthMiddleware implements IMiddleware {
  async handle({ headers }: IRequest): Promise<IResponse | IData> {
    const { authorization } = headers;

    if (!authorization) {
      return {
        statusCode: 401,
        body: {
          error: "Invalid access token.",
        },
      };
    }

    try {
      const [_, token] = authorization.split("Bearer ");

      const payload = verify(token, env.jwtSecret);

      return {
        data: {
          accountId: payload.sub,
        },
      };
    } catch {
      return {
        statusCode: 401,
        body: {
          error: "Invalid access token.",
        },
      };
    }
  }
}
