import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { User } from "@prisma/client";

import { PrismaService } from "../prisma/prisma.service";
import { CHECK_OWNERSHIP_KEY } from "../decorators/checkOwnership.decorator";
import { CheckOwnershipInfo } from "../types/checkOwnershipInfo.interface";

@Injectable()
export class CheckOwnershipGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext) {
    const { of: model, userName, idName } = this.reflector.get<CheckOwnershipInfo>(
      CHECK_OWNERSHIP_KEY,
      context.getHandler()
    );
    const user: User = context.switchToHttp().getRequest().user;
    const targetId = context.switchToHttp().getRequest().params[idName || "id"];
    const target = await this.prisma[model].findUnique({
      where: { [idName || "id"]: targetId },
      include: { [userName || "user"]: true },
    });

    return target[userName || "user"][idName || "id"] === user.id;
  }
}
