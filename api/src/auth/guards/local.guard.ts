import { AuthGuard } from "@nestjs/passport";
import { UnauthorizedException } from "@nestjs/common";

export class LocalAuthGuard extends AuthGuard("local") {
  constructor() {
    super();
  }

  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw new UnauthorizedException("Invalid credentials");
    }
    return user;
  }
}
